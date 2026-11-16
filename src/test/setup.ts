// localStorage tối thiểu cho môi trường Node (store.ts lưu thiệp/nháp ở localStorage).
import { beforeEach } from "vitest";

class MemoryStorage {
  private m = new Map<string, string>();
  get length() { return this.m.size; }
  key(i: number) { return [...this.m.keys()][i] ?? null; }
  getItem(k: string) { return this.m.has(k) ? this.m.get(k)! : null; }
  setItem(k: string, v: string) { this.m.set(k, String(v)); }
  removeItem(k: string) { this.m.delete(k); }
  clear() { this.m.clear(); }
}

Object.defineProperty(globalThis, "localStorage", { value: new MemoryStorage(), configurable: true, writable: true });

beforeEach(() => {
  localStorage.clear();
});
