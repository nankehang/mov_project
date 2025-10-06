import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Initialize S3 client for DigitalOcean Spaces
const s3Client = new S3Client({
  endpoint: process.env.DO_SPACE_ENDPOINT,
  region: "us-east-1", // DigitalOcean Spaces doesn't use regions like AWS, but SDK requires it
  credentials: {
    accessKeyId: process.env.DO_SPACE_KEY,
    secretAccessKey: process.env.DO_SPACE_SECRET,
  },
});

/**
 * Upload file to DigitalOcean Spaces
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} fileName - File name with extension
 * @param {string} mimeType - MIME type of the file
 * @returns {Promise<string>} Public URL of uploaded file
 */
export async function uploadToSpaces(fileBuffer, fileName, mimeType) {
  // Generate unique filename with timestamp
  const timestamp = Date.now();
  const uniqueFileName = `products/${timestamp}-${fileName.replace(/\s+/g, "-")}`;

  const params = {
    Bucket: process.env.DO_SPACE_BUCKET,
    Key: uniqueFileName,
    Body: fileBuffer,
    ACL: "public-read",
    ContentType: mimeType,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // Construct public URL
    const publicUrl = `${process.env.DO_SPACE_ENDPOINT}/${process.env.DO_SPACE_BUCKET}/${uniqueFileName}`;
    
    return publicUrl;
  } catch (error) {
    console.error("Error uploading to DigitalOcean Spaces:", error);
    throw new Error("Failed to upload image to cloud storage");
  }
}

/**
 * Validate image file
 * @param {File} file - File object
 * @returns {boolean}
 */
export function validateImageFile(file) {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    throw new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.");
  }

  if (file.size > maxSize) {
    throw new Error("File size too large. Maximum size is 5MB.");
  }

  return true;
}
