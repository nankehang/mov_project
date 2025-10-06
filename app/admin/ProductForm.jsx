"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUpload from "./components/ImageUpload";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  originalPrice: "",
  discount: "",
  rating: "",
  reviews: "",
  photo_path: "",
  stock: "",
  category: "",
};

export default function ProductForm({ mode = "create", product = null }) {
  const router = useRouter();
  const [formData, setFormData] = useState(product || emptyForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    const payload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      originalPrice:
        formData.originalPrice === "" ? undefined : Number(formData.originalPrice),
      discount: formData.discount === "" ? undefined : Number(formData.discount),
      rating: formData.rating === "" ? undefined : Number(formData.rating),
      reviews: formData.reviews === "" ? undefined : Number(formData.reviews),
      photo_path: formData.photo_path ?? "",
      stock: formData.stock === "" ? undefined : Number(formData.stock),
      category: formData.category ?? "",
    };

    try {
      const url = mode === "edit" ? `/api/products/${product.id}` : "/api/products";
      const method = mode === "edit" ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus({
        type: "success",
        message:
          mode === "edit"
            ? "Product updated successfully."
            : "Product created successfully.",
      });

      // Redirect after 1.5 seconds
      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 1500);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {mode === "edit" ? "Edit Product" : "Add New Product"}
        </h1>
        <Link
          href="/admin"
          className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <form className="space-y-6 sm:space-y-7 lg:space-y-8" onSubmit={handleSubmit}>
        <div>
          <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3">
            Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, name: event.target.value }))
            }
            className="w-full border-2 border-gray-300 rounded-lg px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="e.g. Wireless Headphones"
          />
        </div>

        <div>
          <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3">
            Description *
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                description: event.target.value,
              }))
            }
            rows={5}
            className="w-full border-2 border-gray-300 rounded-lg px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
            placeholder="Describe the product features and benefits..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          <div>
            <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3">
              Price ($) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={formData.price}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  price: event.target.value,
                }))
              }
              className="w-full border-2 border-gray-300 rounded-lg px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3">
              Original price ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.originalPrice}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  originalPrice: event.target.value,
                }))
              }
              className="w-full border-2 border-gray-300 rounded-lg px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          <div>
            <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3">
              Discount (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.discount}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  discount: event.target.value,
                }))
              }
              className="w-full border-2 border-gray-300 rounded-lg px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3">
              Rating (0-5)
            </label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  rating: event.target.value,
                }))
              }
              className="w-full border-2 border-gray-300 rounded-lg px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="4.5"
            />
          </div>
          <div>
            <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3">
              Reviews
            </label>
            <input
              type="number"
              min="0"
              value={formData.reviews}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  reviews: event.target.value,
                }))
              }
              className="w-full border-2 border-gray-300 rounded-lg px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="100"
            />
          </div>
        </div>

        {/* Image Upload Component */}
        <ImageUpload
          currentImage={formData.photo_path}
          onImageUploaded={(url) =>
            setFormData((prev) => ({
              ...prev,
              photo_path: url,
            }))
          }
        />

        {/* Optional: Manual URL input as fallback */}
        <div>
          <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3">
            Or enter image URL manually (optional)
          </label>
          <input
            type="text"
            value={formData.photo_path}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                photo_path: event.target.value,
              }))
            }
            className="w-full border-2 border-gray-300 rounded-lg px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="https://your-cdn.com/image.jpg or 🎧"
          />
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            You can also use an emoji (🎧) or paste a direct URL to an external image.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          <div>
            <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3">
              Stock Quantity
            </label>
            <input
              type="number"
              min="0"
              value={formData.stock}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  stock: event.target.value,
                }))
              }
              className="w-full border-2 border-gray-300 rounded-lg px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="e.g. 50"
            />
          </div>
          <div>
            <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  category: event.target.value,
                }))
              }
              className="w-full border-2 border-gray-300 rounded-lg px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Sports & Outdoors">Sports & Outdoors</option>
              <option value="Books & Media">Books & Media</option>
              <option value="Toys & Games">Toys & Games</option>
              <option value="Health & Beauty">Health & Beauty</option>
              <option value="Food & Beverages">Food & Beverages</option>
              <option value="Automotive">Automotive</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {status.type !== "idle" && (
          <div
            className={`text-base rounded-lg px-5 py-4 border ${
              status.type === "success"
                ? "text-green-700 bg-green-50 border-green-200"
                : "text-red-700 bg-red-50 border-red-200"
            }`}
          >
            {status.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed font-semibold text-base shadow-sm hover:shadow"
          >
            {isSubmitting
              ? "Saving..."
              : mode === "edit"
              ? "Update Product"
              : "Create Product"}
          </button>
          <Link
            href="/admin"
            className="text-center text-base text-gray-600 hover:text-gray-800 px-6 py-4 font-semibold"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
