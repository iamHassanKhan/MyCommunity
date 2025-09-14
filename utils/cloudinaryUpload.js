// src/utils/cloudinaryUpload.js
import { CLOUDINARY } from "../config/cloudinary";

export const uploadToCloudinary = async (fileUri) => {
  try {
    const data = new FormData();

    // Extract file extension from URI
    const extMatch = fileUri.match(/\.(\w+)$/);
    const ext = extMatch ? extMatch[1].toLowerCase() : "jpg";

    // Determine type based on extension
    let mimeType = "image/jpeg";
    let fileName = `upload.${ext}`;
    let cloudinaryType = "image"; // default

    if (["mp4", "mov", "avi", "mkv"].includes(ext)) {
      mimeType = "video/mp4";
      cloudinaryType = "video";
    } else if (["pdf", "doc", "docx", "txt", "xls", "xlsx"].includes(ext)) {
      mimeType = "application/octet-stream";
      cloudinaryType = "raw";
    }

    data.append("file", {
      uri: fileUri,
      type: mimeType,
      name: fileName,
    });
    data.append("upload_preset", CLOUDINARY.uploadPreset);

    const res = await fetch(
      `${CLOUDINARY.baseUrl}${CLOUDINARY.cloudName}/${cloudinaryType}/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    return result.secure_url; // Cloudinary URL
  } catch (error) {
    console.error("Cloudinary upload error", error);
    throw error;
  }
};
