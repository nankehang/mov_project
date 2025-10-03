import Header from './components/Header';
import Navigation from './components/Navigation';
import ProductSearch from './components/ProductSearch';
import Footer from './components/Footer';
import { getProducts } from '@/lib/products';

export default async function Home() {
  const products = await getProducts();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            🎉 Welcome to Hmoobwin
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            Discover amazing products at unbeatable prices. Shop with confidence and enjoy fast, free delivery on orders over $50.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <button className="bg-white text-red-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors hover:shadow-lg text-sm sm:text-base">
              Chat Now
            </button>
          </div>
        </div>
      </section>

      {/* Search + Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              🔍 Find Your Next Favourite
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Use the live search to instantly filter products by name or description as you type.
            </p>
          </div>

          <ProductSearch products={products} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 text-4xl">�</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800">Free Shipping</h3>
              <p className="text-gray-600">Free delivery on all orders over $50</p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-4xl">🔒</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800">Secure Payment</h3>
              <p className="text-gray-600">Your payment information is safe with us</p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-4xl">↩️</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy for your peace of mind</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">📧 Stay in the Loop</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Get the latest deals, new arrivals, and exclusive offers delivered straight to your inbox.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export const revalidate = 0;
