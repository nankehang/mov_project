"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function formatCurrency(value) {
  if (value === undefined || value === null || value === "") return "";
  return Number(value).toFixed(2);
}

export default function AdminDashboard({ products, adminName }) {
  const router = useRouter();
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete product");
      }

      setStatus({ type: "success", message: "Product deleted successfully." });
      router.refresh();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">
              Welcome back{adminName ? `, ${adminName}` : ""}! Manage your catalog below.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start">
            <Link
              href="/admin/products/new"
              className="bg-white border border-red-500 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 font-medium transition-colors"
            >
              + New product
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Sign out
            </button>
          </div>
        </header>

        <section className="bg-white rounded-xl shadow p-6 sm:p-8">
          {status.type !== "idle" && (
            <div
              className={`text-base rounded-lg px-5 py-4 border mb-6 ${
                status.type === "success"
                  ? "text-green-700 bg-green-50 border-green-200"
                  : "text-red-700 bg-red-50 border-red-200"
              }`}
            >
              {status.message}
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Products ({products.length})
          </h2>
          
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                      Product
                    </th>
                    <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                      Price
                    </th>
                    <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap hidden sm:table-cell">
                      Stock
                    </th>
                    <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap hidden md:table-cell">
                      Rating
                    </th>
                    <th className="px-3 sm:px-4 py-3 text-right font-semibold text-gray-700 whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 sm:px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-red-50 to-red-100 border border-red-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {product.photo_path ? (
                              <img 
                                src={product.photo_path} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-2xl text-red-400">
                                {product.name?.[0]?.toUpperCase() || "?"}
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-gray-900 truncate max-w-[200px] sm:max-w-xs">
                              {product.name}
                            </div>
                            <div className="text-xs text-gray-500 truncate max-w-[200px] sm:max-w-xs">
                              {product.category || "Uncategorized"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                        <div className="font-semibold text-gray-900">
                          ${formatCurrency(product.price)}
                        </div>
                        {product.discount && (
                          <div className="text-xs text-green-600 font-medium">
                            -{product.discount}% off
                          </div>
                        )}
                      </td>
                      <td className="px-3 sm:px-4 py-3 whitespace-nowrap hidden sm:table-cell">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            (product.stock ?? 0) > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.stock ?? 0} in stock
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-3 whitespace-nowrap hidden md:table-cell">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-gray-700 font-medium">
                            {product.rating?.toFixed(1) ?? "N/A"}
                          </span>
                          <span className="text-gray-400 text-xs">
                            ({product.reviews ?? 0})
                          </span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="inline-flex items-center px-3 py-1.5 border border-red-300 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
                          >
                            <span className="hidden sm:inline">Edit</span>
                            <span className="sm:hidden">✏️</span>
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(product.id)}
                            disabled={isSubmitting}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                          >
                            <span className="hidden sm:inline">Delete</span>
                            <span className="sm:hidden">🗑️</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
