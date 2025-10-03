import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProducts } from "@/lib/products";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const session = await auth();

  if (!session || session.user?.role !== "admin") {
    redirect("/admin/login");
  }

  const products = await getProducts();

  return <AdminDashboard products={products} adminName={session.user?.name} />;
}

export const revalidate = 0;
