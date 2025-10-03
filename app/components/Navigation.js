import Link from 'next/link';

export default function Navigation() {
  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Books',
    'Toys',
    'Health',
    'Automotive'
  ];

  return (
    <nav className="bg-white shadow-md border-t-2 border-red-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center lg:justify-start py-3">
          {/* Categories Menu */}
          <div className="flex flex-wrap gap-2 lg:gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href="#"
                className="px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-200 text-sm lg:text-base font-medium"
              >
                {category}
              </Link>
            ))}
          </div>
          
          {/* Special Offers */}
          <div className="hidden lg:flex ml-auto">
            <Link
              href="#"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors font-medium"
            >
              🔥 Special Offers
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}