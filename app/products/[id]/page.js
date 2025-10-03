import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductById } from "@/lib/products";
import ImageGallery from "@/app/components/ImageGallery";
import Header from "@/app/components/Header";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";

export const dynamic = "force-dynamic";

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  // Prepare gallery images
  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [
        product.photo_path || "📦",
        product.photo_path || "📦",
        product.photo_path || "📦",
        product.photo_path || "📦",
      ];

  const ratingValue = Math.max(0, Math.min(5, Math.round(product.rating ?? 0)));
  const savingsAmount = product.originalPrice
    ? (product.originalPrice - product.price).toFixed(2)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-red-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/" className="hover:text-red-600 transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium line-clamp-1">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Details Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Image Gallery */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ImageGallery images={galleryImages} productName={product.name} />
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                {product.category && (
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                    {product.category}
                  </span>
                )}
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400 text-lg">
                    {"★".repeat(ratingValue)}
                    {"☆".repeat(5 - ratingValue)}
                  </div>
                  <span className="text-gray-700 font-semibold">
                    {product.rating?.toFixed(1) || "0.0"}
                  </span>
                </div>
                <span className="text-gray-500">
                  ({product.reviews || 0} reviews)
                </span>
              </div>

              {/* Price Section */}
              <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-bold text-red-600">
                    ${product.price?.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-2xl text-gray-500 line-through">
                      ${product.originalPrice?.toFixed(2)}
                    </span>
                  )}
                  {product.discount && (
                    <span className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-lg">
                      Save {product.discount}%
                    </span>
                  )}
                </div>

                {savingsAmount > 0 && (
                  <p className="text-green-600 font-semibold">
                    You save: ${savingsAmount}
                  </p>
                )}

                {product.stock !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Stock:</span>
                    {product.stock > 0 ? (
                      <span className="text-sm font-semibold text-green-600">
                        ✓ {product.stock} available
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-red-600">
                        ✗ Out of stock
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-gray-900">
                  Product Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-red-600 hover:text-red-600 transition-colors font-bold text-xl">
                    −
                  </button>
                  <input
                    type="number"
                    defaultValue="1"
                    min="1"
                    max={product.stock || 99}
                    className="w-20 h-12 text-center border-2 border-gray-300 rounded-lg font-semibold text-lg focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
                  />
                  <button className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-red-600 hover:text-red-600 transition-colors font-bold text-xl">
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  disabled={product.stock === 0}
                  className="flex-1 bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  <span className="text-2xl">🛒</span>
                  <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
                </button>
                <button className="sm:w-auto px-8 py-4 border-2 border-red-600 text-red-600 rounded-xl font-semibold text-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                  <span className="text-2xl">❤️</span>
                  <span>Wishlist</span>
                </button>
              </div>

              {/* Features / Highlights */}
              <div className="bg-blue-50 rounded-xl p-6 space-y-3 border border-blue-200">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-xl">🎁</span>
                  <span>Why Buy From Us?</span>
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Free shipping on orders over $50
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    30-day return policy
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Secure payment processing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    1-year warranty included
                  </li>
                </ul>
              </div>

              {/* Share Section */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <span className="text-sm font-semibold text-gray-700">Share:</span>
                <div className="flex gap-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 transition-colors">
                    <span className="text-xl">📱</span>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 transition-colors">
                    <span className="text-xl">📧</span>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 transition-colors">
                    <span className="text-xl">🔗</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
