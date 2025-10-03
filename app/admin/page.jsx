import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getProducts } from "@/lib/products";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    redirect("/admin/login");
  }

  const products = await getProducts();

  return <AdminDashboard products={products} adminName={session.user?.name} />;
}

export const revalidate = 0;
