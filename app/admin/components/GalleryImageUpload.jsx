"use client";

import { useState } from "react";

export default function GalleryImageUpload({ gallery = [], onGalleryChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleAddImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      // Add new image URL to gallery
      const updatedGallery = [...gallery, data.url];
      onGalleryChange(updatedGallery);
    } catch (err) {
      setError(err.message);
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedGallery = gallery.filter((_, i) => i !== index);
    onGalleryChange(updatedGallery);
  };

  const handleManualAdd = () => {
    const url = prompt("Enter image URL:");
    if (url && url.trim()) {
      const updatedGallery = [...gallery, url.trim()];
      onGalleryChange(updatedGallery);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-base sm:text-lg font-semibold text-gray-700">
          Gallery Images (Additional Photos)
        </label>
        <span className="text-sm text-gray-500">{gallery.length} image{gallery.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Gallery Grid */}
      {gallery.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-300 bg-gray-50">
                <img
                  src={url}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='16'%3E🖼️%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg opacity-0 group-hover:opacity-100"
                aria-label="Remove image"
              >
                ×
              </button>
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Buttons */}
      <div className="flex flex-wrap gap-3">
        <label className="relative cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleAddImage}
            disabled={uploading}
            className="hidden"
          />
          <div className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed font-medium text-sm inline-flex items-center gap-2 shadow-sm">
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Uploading...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Image
              </>
            )}
          </div>
        </label>

        <button
          type="button"
          onClick={handleManualAdd}
          disabled={uploading}
          className="bg-gray-600 text-white px-5 py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed font-medium text-sm inline-flex items-center gap-2 shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Add URL
        </button>
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <p className="text-sm text-gray-500 leading-relaxed">
        📸 Upload multiple images to showcase your product from different angles. 
        Images will be displayed in the product detail page gallery.
      </p>
    </div>
  );
}
