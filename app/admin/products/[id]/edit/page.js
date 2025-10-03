import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import ProductForm from "../../../ProductForm";
import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    redirect("/admin/login");
  }

  const product = await getProductById(id);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <ProductForm mode="edit" product={product} />
      </div>
    </div>
  );
}
