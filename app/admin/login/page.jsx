import { Suspense } from "react";
import AdminLoginClient from "./AdminLoginClient";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
          <div className="rounded-xl bg-white px-8 py-6 text-center text-gray-600 shadow-lg">
            Loading admin login…
          </div>
        </div>
      }
    >
      <AdminLoginClient />
    </Suspense>
  );
}
