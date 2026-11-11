import { apiFetch } from "./client";

export interface MediaUploadResult {
  id: string;
  originalName: string;
  filename: string;
  url: string;
  contentType: string;
  size: number;
}

export const mediaApi = {
  async upload(fileOrBlob: File | Blob, filename = "image.webp"): Promise<MediaUploadResult> {
    const formData = new FormData();
    if (fileOrBlob instanceof File) {
      formData.append("file", fileOrBlob);
    } else {
      formData.append("file", fileOrBlob, filename);
    }

    return apiFetch<MediaUploadResult>("/media/upload", {
      method: "POST",
      body: formData,
    });
  },
};
