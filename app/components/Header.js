import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-2 text-xs sm:text-sm border-b border-red-500 gap-2">
          <div className="flex flex-col sm:flex-row sm:space-x-4 text-center sm:text-left">
            <span className="whitespace-nowrap">📞 +1-234-567-8900</span>
            <span className="hidden sm:inline">📧 support@hmoobwin.com</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="#"
              className="bg-white text-blue-600 hover:bg-blue-100 transition-colors 
                      px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow 
                      text-xs sm:text-sm"
            >
              Facebook
            </Link>
            <Link
              href="#"
              className="bg-white text-green-600 hover:bg-green-100 transition-colors 
                      px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow 
                      text-xs sm:text-sm"
            >
              WhatsApp
            </Link>
          </div>
        </div>
        
        {/* Main header */}
        <div className="py-3 sm:py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            {/* Logo */}
            <div className="flex items-center justify-center lg:justify-start mb-3 lg:mb-0">
              <Link href="/" aria-label="Go to homepage" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="hmoobwin Logo"
                  width={60}
                  height={60}
                  className="mr-2 sm:mr-3 rounded-full bg-transparent sm:w-[80px] sm:h-[80px] lg:w-[100px] lg:h-[100px]"
                priority
                unoptimized
              />
              </Link>
              <Link href="/" aria-label="Go to homepage" className="flex items-center"><h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                Hmoobwin
              </h1></Link>
              
            </div>
              
            {/* Navigation Links */}
            <nav className="flex items-center justify-center lg:justify-end space-x-6 sm:space-x-8 lg:space-x-10 lg:px-4">
              <Link 
                href="/" 
                className="text-sm sm:text-base lg:text-lg font-medium hover:text-red-200 transition-colors px-3 py-2"
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-sm sm:text-base lg:text-lg font-medium hover:text-red-200 transition-colors px-3 py-2"
              >
                About
              </Link>
            </nav>
            
            {/* Search Bar */}
            {/* <div className="flex-1 max-w-2xl mx-0 lg:mx-8 mb-4 lg:mb-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-3 rounded-lg text-gray-800 border-2 border-white focus:border-red-200 focus:outline-none"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md transition-colors">
                  🔍
                </button>
              </div>
            </div> */}
            
            {/* Cart and User Actions */}
            {/* <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 hover:text-red-200 transition-colors">
                <span>❤️</span>
                <span className="hidden sm:inline">Wishlist</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-red-200 transition-colors relative">
                <span>🛒</span>
                <span className="hidden sm:inline">Cart</span>
                <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  3
                </span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}