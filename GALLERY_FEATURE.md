# Multiple Image Gallery Feature - Implementation Guide

## Overview
This document describes the multiple image gallery feature implementation for the Product system. Products can now have a main image (`photo_path`) plus multiple gallery images for detailed product views.

## Changes Made

### 1. New Component: `GalleryImageUpload.jsx`
**Location:** `app/admin/components/GalleryImageUpload.jsx`

**Features:**
- Upload multiple images to DigitalOcean Spaces
- Display gallery images in a grid with thumbnails
- Add images via file upload or manual URL input
- Remove individual images with delete button
- Image counter showing total images
- Responsive grid layout (2-3-4 columns)
- Upload progress indicator
- Error handling and validation

**Props:**
- `gallery` (array): Current gallery image URLs
- `onGalleryChange` (function): Callback when gallery is updated

### 2. Updated: `ProductForm.jsx`
**Location:** `app/admin/ProductForm.jsx`

**Changes:**
- Added `GalleryImageUpload` component import
- Added `gallery: []` to empty form state
- Updated form submission payload to include `gallery` array
- Integrated gallery upload component in the form UI
- Gallery images are saved along with other product data

**UI Sections:**
1. **Main Photo Upload** (ImageUpload component)
   - Primary product image (`photo_path`)
   - Single image with preview
   
2. **Gallery Images** (GalleryImageUpload component - NEW)
   - Multiple additional product images
   - Grid display with delete buttons
   - Position indicators (#1, #2, etc.)

### 3. Updated: API Routes

#### `app/api/products/route.js` (POST)
**Changes:**
- Added `gallery` to request body destructuring
- Save `gallery` array when creating products
- Return `gallery` in response

```javascript
gallery: Array.isArray(gallery) ? gallery : [],
```

#### `app/api/products/[id]/route.js` (PATCH)
**Changes:**
- Added `gallery` update handling
- Added `stock` and `category` update handling
- Validates gallery is an array before saving

```javascript
if (payload.gallery !== undefined) {
  updates.gallery = Array.isArray(payload.gallery) ? payload.gallery : [];
}
```

### 4. Updated: Product Detail Page
**Location:** `app/products/[id]/page.js`

**Changes:**
- Improved gallery image logic
- Uses actual gallery images when available (limit 4 for display)
- Falls back to main photo if no gallery
- Better handling of empty states

**Display Logic:**
```javascript
if (product.gallery && product.gallery.length > 0) {
  galleryImages = product.gallery.slice(0, 4);  // Show up to 4 images
} else if (product.photo_path) {
  galleryImages = [product.photo_path];  // Fallback to main photo
} else {
  galleryImages = ["📦"];  // No images
}
```

### 5. Existing Component: `ImageGallery.jsx`
**Location:** `app/components/ImageGallery.jsx`

**Already supports:**
- Multiple image navigation with arrow buttons
- Thumbnail strip below main image
- Active image highlighting
- Swipe indicators for mobile
- Image counter (e.g., "2 / 4")
- Responsive design

**No changes needed** - component already handles arrays perfectly!

## Database Schema

The `Product` model already includes:
```javascript
{
  photo_path: { type: String, trim: true, default: "" },  // Main photo
  gallery: { type: [String], default: [] },                // Gallery array
}
```

## Usage

### For Admins - Adding Products

1. **Navigate to Add New Product**
   - Go to Admin Dashboard
   - Click "Create New Product"

2. **Upload Main Photo**
   - Use the "Primary Product Image" section
   - Click "Choose File" or enter URL manually
   - This becomes the main thumbnail

3. **Add Gallery Images (NEW)**
   - Scroll to "Gallery Images" section
   - Click "Add Image" to upload from computer
   - Or click "Add URL" to paste image links
   - Upload multiple images (2-4 recommended)
   - Remove unwanted images with × button
   - Images are numbered (#1, #2, #3, etc.)

4. **Save Product**
   - Gallery images are automatically saved
   - All images stored in DigitalOcean Spaces

### For Admins - Editing Products

1. **Edit Existing Product**
   - Click "Edit" on any product in dashboard
   - Form loads with existing gallery images

2. **Manage Gallery**
   - View all current gallery images
   - Add new images with "Add Image" button
   - Remove images by clicking × on thumbnail
   - Changes save when you click "Update Product"

### For Users - Viewing Products

1. **Product List View**
   - Shows main photo (`photo_path`)
   - Click "View Product" to see details

2. **Product Detail View**
   - Large main image display
   - **Gallery navigation** (if multiple images exist):
     - Arrow buttons for previous/next
     - Thumbnail strip below main image
     - Click thumbnails to jump to specific image
     - Image counter shows position (e.g., "3 / 4")
     - Mobile: Swipe dots for easy navigation

## Image Storage

All images (both main and gallery) are stored in:
- **DigitalOcean Spaces**
- Region: Singapore (sgp1)
- Bucket: hmoogwin
- URL format: `https://sgp1.digitaloceanspaces.com/hmoogwin/products/{timestamp}-{filename}`

## Recommendations

### Image Guidelines
- **Main Photo**: Product hero shot, clear and professional
- **Gallery Images**: 2-4 additional images recommended
  - Different angles
  - Close-up details
  - Product in use
  - Size comparison
  - Packaging

### Image Specifications
- **Format**: JPEG, PNG, GIF, or WebP
- **Max Size**: 5MB per image
- **Dimensions**: 800x800px or larger (square recommended)
- **Quality**: High resolution for zoom/detail views

### Best Practices
1. Always upload at least 1 gallery image (in addition to main photo)
2. Show product from multiple angles
3. Include scale/size reference images
4. Keep image file sizes optimized (compress before upload)
5. Use consistent lighting and backgrounds
6. Test on mobile devices

## Technical Details

### Component Communication Flow
```
ProductForm
├── ImageUpload (main photo)
│   └── Updates formData.photo_path
└── GalleryImageUpload (gallery images)
    └── Updates formData.gallery[]
```

### API Data Flow
```
Admin Form Submit
└── POST/PATCH /api/products/[id]
    ├── Saves photo_path (string)
    └── Saves gallery (array of strings)
        └── Stored in MongoDB

Product Detail Page Load
└── GET /api/products/[id]
    ├── Retrieves photo_path
    └── Retrieves gallery[]
        └── Passed to ImageGallery component
```

### State Management
- `formData.photo_path`: String - main image URL
- `formData.gallery`: Array - array of image URLs
- Form validation: Gallery must be array (defaults to [])
- API validation: Checks `Array.isArray(gallery)`

## Testing Checklist

- [x] Create product with main photo only
- [x] Create product with main photo + gallery (2-4 images)
- [x] Edit product and add gallery images
- [x] Edit product and remove gallery images
- [x] View product detail with single image
- [x] View product detail with multiple images
- [x] Gallery navigation works (arrows, thumbnails)
- [x] Mobile responsive layout
- [x] Image upload validation
- [x] Error handling for failed uploads
- [x] Delete image confirmation
- [x] Gallery persists after page refresh

## Troubleshooting

### Gallery images not showing
1. Check product has `gallery` array in database
2. Verify image URLs are accessible
3. Check browser console for errors
4. Ensure ImageGallery component receives images prop

### Upload fails
1. Check file size (must be < 5MB)
2. Check file type (JPEG, PNG, GIF, WebP only)
3. Verify DigitalOcean Spaces credentials
4. Check network connection
5. Review browser console for error messages

### Images load slowly
1. Optimize image file sizes before upload
2. Use image compression tools
3. Consider using WebP format
4. Check DigitalOcean Spaces CDN settings

## Future Enhancements (Optional)

- [ ] Drag and drop to reorder gallery images
- [ ] Bulk image upload (multiple files at once)
- [ ] Image cropping/editing tool
- [ ] Zoom functionality on main image
- [ ] Video support in gallery
- [ ] 360° product view
- [ ] Image lazy loading optimization
- [ ] Progressive image loading
- [ ] Gallery lightbox/modal view

## Support

For issues or questions:
1. Check this documentation
2. Review browser console errors
3. Check DigitalOcean Spaces dashboard
4. Verify MongoDB data structure
5. Test with smaller image files

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Feature:** Multiple Image Gallery
