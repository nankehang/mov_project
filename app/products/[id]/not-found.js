import Link from "next/link";
import Header from "@/app/components/Header";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md space-y-6">
          <div className="text-9xl">😞</div>
          <h1 className="text-4xl font-bold text-gray-900">
            Product Not Found
          </h1>
          <p className="text-lg text-gray-600">
            Sorry, we couldn't find the product you're looking for. It may have been removed or the link might be incorrect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <span>🏠</span>
              <span>Back to Home</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-red-600 hover:text-red-600 transition-colors"
            >
              <span>🔍</span>
              <span>Browse Products</span>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
