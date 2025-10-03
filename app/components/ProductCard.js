import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const photoValue = product.photo_path || "";
  const isImagePath = /^(https?:\/\/|\/|data:)/.test(photoValue);
  const fallbackLabel = photoValue || product.name?.[0]?.toUpperCase() || "?";
  const ratingValue = Math.max(
    0,
    Math.min(5, Math.round(product.rating ?? 0))
  );
  const reviewsValue = product.reviews ?? 0;

  return (
    <div className="flex flex-col h-full w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-[4/5] w-full bg-gray-100">
        {isImagePath ? (
          <Image
            src={photoValue}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 220px, (min-width: 768px) 33vw, 45vw"
            priority={false}
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-3xl">{fallbackLabel}</span>
          </div>
        )}
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-1 left-1 bg-red-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">
            -{product.discount}%
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors text-xs">
            ❤️
          </button>
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors text-xs">
            👁️
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors text-sm leading-tight">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex text-yellow-400 text-xs">
            {"★".repeat(ratingValue)}
            {"☆".repeat(5 - ratingValue)}
          </div>
          <span className="text-gray-500 text-xs ml-1">({reviewsValue})</span>
        </div>
        
        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            <span className="text-lg font-bold text-red-600">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-xs">
                ${product.originalPrice}
              </span>
            )}
          </div>
          {product.discount && (
            <span className="text-green-600 text-xs font-medium">
              Save {product.discount}%
            </span>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <Link 
          href={`/products/${product.id}`}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          <span>🛒</span>
          <span>View</span>
        </Link>
      </div>
    </div>
  );
}