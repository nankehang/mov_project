import Product from "@/models/Product";
import { connectDB } from "./db";

export async function getProducts() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return products.map((product) => ({
    ...product,
    id: product._id.toString(),
    _id: undefined,
    createdAt: product.createdAt?.toISOString?.(),
    updatedAt: product.updatedAt?.toISOString?.(),
  }));
}

export async function getProductById(id) {
  await connectDB();
  const product = await Product.findById(id).lean();
  if (!product) {
    return null;
  }
  return {
    ...product,
    id: product._id.toString(),
    _id: undefined,
    createdAt: product.createdAt?.toISOString?.(),
    updatedAt: product.updatedAt?.toISOString?.(),
  };
}
