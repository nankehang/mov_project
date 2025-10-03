import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProductForm from "../../ProductForm";

export default async function NewProductPage() {
  const session = await auth();

  if (!session || session.user?.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <ProductForm mode="create" />
      </div>
    </div>
  );
}
