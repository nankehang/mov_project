# Testing DigitalOcean Spaces Integration

## Quick Start Guide

### 1. Verify Environment Variables

Ensure your `.env.local` has the correct values:

```env
DO_SPACE_KEY="key-1759744027416"
DO_SPACE_SECRET="bZjONretF6idVe2joiJ6skrXrbA14OUCPY7WZ6OqxjQ"
DO_SPACE_BUCKET="hmoogwin"
DO_SPACE_ENDPOINT="https://hmoogwin.sgp1.digitaloceanspaces.com"
```

⚠️ **Important:** Your endpoint should be just the base URL without the bucket name at the end:
- ✅ Correct: `https://sgp1.digitaloceanspaces.com`
- ❌ Wrong: `https://hmoogwin.sgp1.digitaloceanspaces.com`

### 2. Update Your Endpoint (If Needed)

Based on your `.env.local`, your endpoint includes the bucket name. Update it to:

```env
DO_SPACE_ENDPOINT="https://sgp1.digitaloceanspaces.com"
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Test Upload Flow

1. **Login as Admin:**
   - Navigate to http://localhost:3000/admin/login
   - Email: admin@hmoobwin.com
   - Password: ChangeMe123!

2. **Add New Product:**
   - Click "New product" button
   - Fill in product details
   - Scroll to "Product Image" section
   - Click "Choose File" and select an image
   - Watch upload progress
   - Preview should appear with the cloud URL

3. **Verify Upload:**
   - Check the URL format: should be like `https://sgp1.digitaloceanspaces.com/hmoogwin/products/1234567890-filename.jpg`
   - Submit the form
   - Image should appear in the product list

4. **View on Frontend:**
   - Navigate to home page
   - Product card should show the uploaded image
   - Click on product to view details
   - Image gallery should display the cloud image

### 5. Test Edit Flow

1. Go to Admin Dashboard
2. Click "Edit" on any product
3. Upload a new image
4. Old image is replaced (but not deleted from Spaces)
5. Save changes
6. Verify new image appears everywhere

## Troubleshooting

### Upload Returns 401 Unauthorized
**Problem:** Not logged in as admin
**Solution:** Login at `/admin/login` with admin credentials

### Upload Returns 403 Forbidden
**Problem:** Space permissions or wrong credentials
**Solutions:**
- Verify DO_SPACE_KEY and DO_SPACE_SECRET
- Check Space is set to "Public" in DigitalOcean dashboard
- Regenerate API keys if needed

### Image Uploads but Doesn't Display
**Problem:** ACL or CORS issue
**Solutions:**
1. Check Space settings in DigitalOcean:
   - Go to your Space → Settings
   - Ensure "File Listing" is enabled
   - Check "Public" access is enabled

2. Add CORS configuration:
   - Go to Space → Settings → CORS
   - Add the following:
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

### Error: "Cannot find module '@aws-sdk/client-s3'"
**Problem:** Dependencies not installed
**Solution:**
```bash
npm install
```

### Images Load Slowly
**Problem:** Large file sizes
**Solutions:**
- Use compressed images before upload
- Enable CDN on your Space (DigitalOcean provides this)
- Consider adding image optimization

## Testing Checklist

- [ ] Upload image on "Add New Product"
- [ ] Upload image on "Edit Product"
- [ ] Image preview shows immediately
- [ ] Cloud URL is saved to database
- [ ] Image displays on product card
- [ ] Image displays on product details page
- [ ] Image displays in admin dashboard
- [ ] Multiple uploads work correctly
- [ ] Error handling for large files (>5MB)
- [ ] Error handling for invalid file types
- [ ] Manual URL input still works as fallback
- [ ] Emoji fallback still works

## Manual Space Access

To verify uploads directly:

1. Login to DigitalOcean
2. Navigate to Spaces
3. Click on your "hmoogwin" space
4. Look for "products" folder
5. You should see uploaded images with timestamp prefixes

## Deployment Checklist

Before deploying to production:

1. ✅ Environment variables set on Railway/Vercel
2. ✅ DigitalOcean Space is in correct region
3. ✅ Space has public access enabled
4. ✅ CORS configured if needed
5. ✅ API keys are valid and have write permissions
6. ✅ Build succeeds (`npm run build`)
7. ✅ Test upload in production environment
8. ✅ Check image loading from different devices
9. ✅ Verify CDN is enabled for faster delivery

## Migration Notes

If you have existing products with local images:

1. **Option 1 - Manual Upload:**
   - Edit each product in admin
   - Re-upload the image
   - Save

2. **Option 2 - Bulk Upload Script:**
   - Create a script to upload all `/public` images
   - Update database with new URLs
   - (Script not included, would need to be written)

3. **Option 3 - Hybrid:**
   - Keep existing products with `/public` images
   - New products use DigitalOcean Spaces
   - Migrate gradually

## Cost Estimation

DigitalOcean Spaces pricing (as of 2025):
- $5/month for 250GB storage
- $1 per GB for data transfer over 1TB

For a typical e-commerce site with 1000 products:
- Average image size: 500KB
- Total storage: ~500MB
- Cost: $5/month (well within limits)

## Security Best Practices

1. ✅ Never commit `.env.local` to Git
2. ✅ Use separate Spaces for dev/staging/production
3. ✅ Rotate API keys periodically
4. ✅ Monitor Space usage in DigitalOcean dashboard
5. ✅ Set up billing alerts
6. ✅ Keep bucket name unpredictable for security
7. ✅ Enable access logs if needed

## Next Steps

After successful testing:

1. Commit changes to Git
2. Push to GitHub
3. Deploy to Railway/Vercel
4. Set environment variables in deployment platform
5. Test upload in production
6. Monitor Space usage
7. Consider adding:
   - Image compression
   - Multiple image support
   - Old image deletion
   - Image optimization
