import { mediaApi } from "@/services/api/mediaApi";
import { uuid } from "@/utils/uuid";

const DB_NAME = "chungdoi-images";
const STORE_NAME = "blobs";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE_NAME);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function putBlob(blob: Blob): Promise<string> {
  const id = uuid();
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(blob, id);
    tx.oncomplete = () => resolve(`idb:${id}`);
    tx.onerror = () => reject(tx.error);
  });
}

async function getBlob(key: string): Promise<Blob | null> {
  const id = key.slice(4);
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(id);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () => resolve(null);
  });
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, b64] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)?.[1] || "image/png";
  const bytes = atob(b64);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

const uploadedUrlCache = new Map<string, string>();
const idbToBlobUrl = new Map<string, string>();

/**
 * Chuyển một URL tạm (blob: hoặc data:) thành file lưu trong DB của máy chủ backend qua /api/v1/media/upload.
 * Trả về đường dẫn /api/v1/media/{uuid}.webp được đọc trực tiếp từ DB.
 * Nếu chưa đăng nhập hoặc lỗi mạng, fallback an toàn vào IndexedDB.
 */
export async function persistUrl(url: string): Promise<string> {
  if (!url) return url;
  if (url.startsWith("/api/v1/media/") || url.startsWith("http") || url.startsWith("idb:")) return url;
  if (uploadedUrlCache.has(url)) return uploadedUrlCache.get(url)!;

  let blob: Blob;
  if (url.startsWith("blob:")) {
    try {
      const resp = await fetch(url);
      blob = await resp.blob();
    } catch {
      return url;
    }
  } else if (url.startsWith("data:")) {
    blob = dataUrlToBlob(url);
  } else {
    return url;
  }

  // Thử tải lên backend để lưu vào PostgreSQL DB (dạng BYTEA)
  try {
    const ext = blob.type.includes("png") ? ".png" : blob.type.includes("jpeg") ? ".jpg" : ".webp";
    const filename = `img_${Date.now()}${ext}`;
    const result = await mediaApi.upload(blob, filename);
    if (result && result.url) {
      uploadedUrlCache.set(url, result.url);
      return result.url;
    }
  } catch (err) {
    console.warn("Upload lên DB thất bại, fallback vào IndexedDB tạm thời:", err);
  }

  // Fallback sang IndexedDB nếu backend chưa sẵn sàng hoặc chưa đăng nhập
  const key = await putBlob(blob);
  uploadedUrlCache.set(url, key);
  idbToBlobUrl.set(key, url);
  return key;
}

/**
 * Chuyển khoá ảnh thành URL hiển thị được.
 * Nếu đã là URL từ Backend DB (/api/v1/media/...) hoặc HTTP URL thì trả về nguyên bản.
 * Nếu là khoá idb: thì chuyển thành object URL từ IndexedDB.
 */
export async function resolveUrl(url: string): Promise<string> {
  if (!url) return url;
  if (url.startsWith("/api/v1/media/") || url.startsWith("http") || url.startsWith("/")) return url;
  if (!url.startsWith("idb:")) return url;

  if (idbToBlobUrl.has(url)) return idbToBlobUrl.get(url)!;
  const blob = await getBlob(url);
  if (!blob) return "";
  const objUrl = URL.createObjectURL(blob);
  idbToBlobUrl.set(url, objUrl);
  uploadedUrlCache.set(objUrl, url);
  return objUrl;
}

import type { Inv } from "@/types/invitation";

async function mapUrls(inv: Inv, fn: (u: string) => Promise<string>): Promise<Inv> {
  const out = { ...inv };
  if (inv.heroPhoto) out.heroPhoto = await fn(inv.heroPhoto);
  out.photos = await Promise.all((inv.photos || []).map(fn));
  if (inv.customSharePhoto) out.customSharePhoto = await fn(inv.customSharePhoto);
  if (inv.gifts?.length) {
    out.gifts = await Promise.all(
      inv.gifts.map(async (g) => {
        if (g.qrUrl && (g.qrUrl.startsWith("blob:") || g.qrUrl.startsWith("data:") || g.qrUrl.startsWith("idb:"))) {
          return { ...g, qrUrl: await fn(g.qrUrl) };
        }
        return g;
      }),
    );
  }
  return out;
}

/** Trước khi lưu: blob:/data: → upload lên DB qua API hoặc fallback idb: */
export function persistInvImages(inv: Inv): Promise<Inv> {
  return mapUrls(inv, persistUrl);
}

/** Sau khi tải: idb: → object URL */
export function resolveInvImages(inv: Inv): Promise<Inv> {
  return mapUrls(inv, resolveUrl);
}

/**
 * Thử tải lại 1 ảnh đang ở dạng idb: (lưu tạm cục bộ, từ lần upload trước khi đăng nhập/do lỗi
 * mạng) lên server. idb: chỉ tồn tại trong IndexedDB của đúng trình duyệt đã tải lên — khách xem
 * thiệp đã xuất bản trên thiết bị khác sẽ thấy ảnh hỏng nếu nó chưa từng lên được server.
 *
 * `inv.photos` thường đã được `resolveInvImages` chuyển idb:xxx → object URL (blob:) để hiển thị,
 * nên không còn chuỗi "idb:" literal nữa — phải tra ngược qua uploadedUrlCache (resolveUrl đã ghi
 * objectURL -> "idb:xxx" vào đó) để biết object URL nào thật ra là lưu tạm, rồi đọc blob gốc từ
 * IndexedDB (không fetch() lại chính blob: URL, vì nó không có trên mạng).
 */
async function retryPersistIdbUrl(url: string): Promise<string> {
  const cached = uploadedUrlCache.get(url);
  const idbKey = url.startsWith("idb:") ? url : cached && cached.startsWith("idb:") ? cached : null;
  if (!idbKey) return url;

  const blob = await getBlob(idbKey);
  if (!blob) return url;
  try {
    const ext = blob.type.includes("png") ? ".png" : blob.type.includes("jpeg") ? ".jpg" : ".webp";
    const filename = `img_${Date.now()}${ext}`;
    const result = await mediaApi.upload(blob, filename);
    if (result && result.url) {
      uploadedUrlCache.set(url, result.url);
      uploadedUrlCache.set(idbKey, result.url);
      return result.url;
    }
  } catch (err) {
    console.warn("Đồng bộ ảnh tạm (idb:) lên server thất bại, giữ nguyên bản lưu cục bộ:", err);
  }
  return url;
}

/** Gọi khi vừa đăng nhập hoặc trước khi xuất bản: thử đưa mọi ảnh idb: còn sót lên server. */
export function retryPersistIdbImages(inv: Inv): Promise<Inv> {
  return mapUrls(inv, retryPersistIdbUrl);
}
