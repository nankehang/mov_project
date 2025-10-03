import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="hmoobwin Logo"
                width={30}
                height={30}
                className="mr-2"
              />
              <h3 className="text-xl font-bold text-red-400">hmoobwin</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted online marketplace for quality products at unbeatable prices. 
              Shop with confidence and enjoy fast, reliable delivery.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">📘</a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">🐦</a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">📷</a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">💼</a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-red-400">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Contact', 'FAQ', 'Shipping Info', 'Returns', 'Size Guide'].map((link, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-red-400">Categories</h4>
            <ul className="space-y-2">
              {['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Health'].map((category, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-red-400">Stay Connected</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:border-red-400 focus:outline-none text-white"
              />
              <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-4 lg:mb-0">
              <h5 className="font-semibold mb-2 text-red-400">Accepted Payments</h5>
              <div className="flex space-x-4 text-2xl">
                <span>💳</span>
                <span>💰</span>
                <span>🏦</span>
                <span>📱</span>
              </div>
            </div>
            
            <div className="text-center lg:text-right">
              <h5 className="font-semibold mb-2 text-red-400">Secure Shopping</h5>
              <div className="flex space-x-4 text-2xl">
                <span>🔒</span>
                <span>✅</span>
                <span>🛡️</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col lg:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 lg:mb-0">
            © 2025 hmoobwin. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="text-gray-400 hover:text-red-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-red-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-red-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}