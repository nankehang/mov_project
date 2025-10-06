# DigitalOcean Spaces Image Storage Integration

## Overview
This project has been refactored to use **DigitalOcean Spaces** (S3-compatible object storage) for image uploads instead of storing images locally in the `/public` directory.

## Features Implemented

### 1. **Cloud Image Upload**
- Admin users can upload product images directly to DigitalOcean Spaces
- Images are uploaded via `/api/upload` endpoint
- Automatic unique filename generation with timestamps
- File validation (type and size)
- ACL set to `public-read` for direct access

### 2. **Image Preview**
- Real-time preview after image selection
- Shows uploaded image URL
- Option to remove and re-upload

### 3. **Secure Storage**
- All credentials stored in `.env.local`
- Server-side upload handling only
- Admin authentication required

### 4. **Fallback Support**
- Manual URL input still available
- Emoji support maintained
- External URL support

## Environment Variables

Add these to your `.env.local` file:

```env
DO_SPACE_KEY=your_access_key
DO_SPACE_SECRET=your_secret_key
DO_SPACE_ENDPOINT=https://sgp1.digitaloceanspaces.com
DO_SPACE_BUCKET=your-bucket-name
```

### DigitalOcean Spaces Setup

1. **Create a Space:**
   - Go to [DigitalOcean Spaces](https://cloud.digitalocean.com/spaces)
   - Click "Create Space"
   - Choose a region (e.g., Singapore - sgp1)
   - Name your space (e.g., `hmoogwin`)
   - Choose "Public" access

2. **Generate API Keys:**
   - Go to API → Spaces Keys
   - Click "Generate New Key"
   - Copy the Key and Secret
   - Add them to `.env.local`

3. **Configure CORS (Optional):**
   ```json
   [
     {
       "AllowedOrigins": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
       "AllowedHeaders": ["*"],
       "MaxAgeSeconds": 3000
     }
   ]
   ```

## Files Created/Modified

### New Files:
1. **`lib/digitalocean.js`** - S3 client and upload utilities
2. **`app/api/upload/route.js`** - Image upload API endpoint
3. **`app/admin/components/ImageUpload.jsx`** - Image upload React component

### Modified Files:
1. **`app/admin/ProductForm.jsx`** - Integrated ImageUpload component
2. **`package.json`** - Added `@aws-sdk/client-s3` dependency

## Usage

### Admin - Upload Product Image

1. Navigate to Admin Dashboard → Add New Product (or Edit Product)
2. Click "Choose File" in the Image Upload section
3. Select an image (JPEG, PNG, GIF, or WebP, max 5MB)
4. Image automatically uploads to DigitalOcean Spaces
5. Preview shows uploaded image
6. URL is automatically filled in the form
7. Submit the form to save the product

### Frontend - Display Images

Images are automatically loaded from DigitalOcean Spaces URLs:
- Product cards show cloud images
- Product detail pages show cloud images in gallery
- Admin dashboard shows cloud images in product list

## API Endpoints

### POST `/api/upload`

**Authentication:** Required (Admin only)

**Request:**
- Content-Type: `multipart/form-data`
- Body: `image` (file)

**Response:**
```json
{
  "success": true,
  "url": "https://sgp1.digitaloceanspaces.com/your-bucket/products/1234567890-image.jpg",
  "message": "Image uploaded successfully"
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

## Image URL Structure

Uploaded images follow this pattern:
```
https://{DO_SPACE_ENDPOINT}/{DO_SPACE_BUCKET}/products/{timestamp}-{filename}
```

Example:
```
https://sgp1.digitaloceanspaces.com/hmoogwin/products/1733543210789-product-image.jpg
```

## Validation

### File Type Validation
- Allowed: JPEG, JPG, PNG, GIF, WebP
- Blocked: All other file types

### File Size Validation
- Maximum: 5MB
- Exceeded size returns error

## Benefits

1. **Scalability:** No server storage limitations
2. **Performance:** CDN-enabled delivery
3. **Reliability:** Redundant storage
4. **Cost-effective:** Pay only for what you use
5. **Easy Management:** DigitalOcean Spaces dashboard

## Migration from Local Storage

To migrate existing products:

1. Upload existing images to DigitalOcean Spaces manually
2. Update product `photo_path` in database with new URLs
3. Or use the admin edit page to re-upload images

## Troubleshooting

### Upload Fails
- Check `.env.local` credentials
- Verify Space is set to "Public" access
- Check Space region matches endpoint
- Ensure bucket name is correct

### Images Don't Display
- Verify Space ACL is set to `public-read`
- Check CORS configuration
- Ensure URL format is correct
- Check browser console for errors

### Authentication Error
- Ensure you're logged in as admin
- Check NextAuth session is active
- Verify admin role in database

## Security Considerations

1. **Environment Variables:** Never commit `.env.local` to version control
2. **Admin Only:** Upload endpoint requires admin authentication
3. **File Validation:** Server-side validation prevents malicious uploads
4. **Public Read:** Images are publicly accessible via URL (intended for product images)

## Future Enhancements

- [ ] Image compression before upload
- [ ] Multiple image upload support
- [ ] Image deletion from Spaces when product is deleted
- [ ] Image resizing/optimization
- [ ] Gallery image management (multiple images per product)
- [ ] Image CDN integration

## Support

For DigitalOcean Spaces documentation:
https://docs.digitalocean.com/products/spaces/

For AWS SDK S3 Client documentation:
https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/
