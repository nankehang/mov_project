import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

class DigitalOceanSpacesService {
  constructor() {
    this.client = new S3Client({
      endpoint: process.env.DO_SPACE_ENDPOINT,
      region: "us-east-1", // DigitalOcean Spaces uses this region
      credentials: {
        accessKeyId: process.env.DO_SPACE_KEY,
        secretAccessKey: process.env.DO_SPACE_SECRET,
      },
      forcePathStyle: false, // Configures to use subdomain/virtual calling format
    });
    
    this.bucketName = process.env.DO_SPACE_BUCKET;
    
    if (!this.bucketName || !process.env.DO_SPACE_KEY || !process.env.DO_SPACE_SECRET || !process.env.DO_SPACE_ENDPOINT) {
      throw new Error("Missing DigitalOcean Spaces configuration. Please check your environment variables.");
    }
  }

  /**
   * Upload a file to DigitalOcean Spaces
   * @param {Buffer} fileBuffer - File buffer
   * @param {string} fileName - File name with extension
   * @param {string} contentType - MIME type of the file
   * @returns {Promise<string>} - Public URL of the uploaded file
   */
  async uploadFile(fileBuffer, fileName, contentType) {
    try {
      // Generate unique filename to prevent conflicts
      const timestamp = Date.now();
      const uniqueFileName = `products/${timestamp}-${fileName}`;

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: uniqueFileName,
        Body: fileBuffer,
        ContentType: contentType,
        ACL: "public-read", // Make file publicly readable
      });

      await this.client.send(command);

      // Construct public URL
      const publicUrl = `${process.env.DO_SPACE_ENDPOINT}/${uniqueFileName}`;
      return publicUrl;
    } catch (error) {
      console.error("Error uploading to DigitalOcean Spaces:", error);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  /**
   * Delete a file from DigitalOcean Spaces
   * @param {string} fileUrl - Full URL of the file to delete
   * @returns {Promise<boolean>} - Success status
   */
  async deleteFile(fileUrl) {
    try {
      // Extract the key from the full URL
      const urlParts = fileUrl.split('/');
      const key = urlParts.slice(-2).join('/'); // Get the last two parts (products/filename)

      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.client.send(command);
      return true;
    } catch (error) {
      console.error("Error deleting from DigitalOcean Spaces:", error);
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  /**
   * Get public URL for a file
   * @param {string} fileName - File name/key
   * @returns {string} - Public URL
   */
  getPublicUrl(fileName) {
    return `${process.env.DO_SPACE_ENDPOINT}/${fileName}`;
  }
}

export default new DigitalOceanSpacesService();