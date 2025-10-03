"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";

const useDebouncedValue = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const normalize = (value) => value?.toLowerCase() ?? "";

const emptyStateMessages = {
  idle: "Start typing to search our catalogue.",
  noResults: "No products match your search. Try a different keyword.",
};

export default function ProductSearch({ products }) {
  const safeProducts = useMemo(() => (Array.isArray(products) ? products : []), [products]);
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebouncedValue(query, 200);
  const trimmedQuery = debouncedQuery.trim();
  const lowerQuery = normalize(trimmedQuery);

  const clientResults = useMemo(() => {
    if (!lowerQuery) {
      return safeProducts;
    }
    return safeProducts.filter((product) => {
      const name = normalize(product.name);
      const description = normalize(product.description);
      return name.includes(lowerQuery) || description.includes(lowerQuery);
    });
  }, [lowerQuery, safeProducts]);

  const resultsToRender = clientResults;

  const handleClear = () => {
    setQuery("");
  };

  const emptyStateKey = !trimmedQuery ? "idle" : "noResults";

  const helperText = "Live filter searches products instantly as you type.";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <div className="w-full lg:max-w-xl">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 103.478 9.713l3.655 3.654a.75.75 0 001.06-1.06l-3.654-3.655A5.5 5.5 0 009 3.5zm-4 5.5a4 4 0 118 0 4 4 0 01-8 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <input
              id="product-search"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or description"
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-20 text-sm font-medium text-gray-700 shadow-sm transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute inset-y-0 right-0 mr-2 inline-flex items-center rounded-full px-4 text-sm font-semibold text-red-600 transition hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                Clear
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-gray-500">{helperText}</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            Showing <strong className="font-semibold text-gray-700">{resultsToRender.length}</strong> products
            {trimmedQuery && ` for "${trimmedQuery}"`}.
          </span>
        </div>

        {resultsToRender.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-10 text-center text-gray-500">
            <p className="text-sm font-medium">{emptyStateMessages[emptyStateKey]}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {resultsToRender.map((product) => (
              <div key={product.id ?? product._id} className="flex justify-center">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}