import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  url: string; publicId: string; width: number; height: number;
}

export async function uploadPropertyImage(
  buffer: Buffer, filename: string, propertyId: string
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `naija-realty/properties/${propertyId}`,
        public_id: filename.replace(/\.[^.]+$/, ""),
        overwrite: true,
        transformation: [
          { width: 1200, height: 900, crop: "fill", gravity: "auto" },
          { quality: "auto:good", fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error("Upload failed"));
        resolve({ url: result.secure_url, publicId: result.public_id, width: result.width, height: result.height });
      }
    );
    stream.end(buffer);
  });
}

export async function deletePropertyImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}