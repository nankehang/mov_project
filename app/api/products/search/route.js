import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";

const MAX_RESULTS = 120;
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").trim();

  if (!query) {
    return NextResponse.json([]);
  }

  const escaped = escapeRegExp(query);
  const caseInsensitiveRegex = new RegExp(escaped, "i");

  await connectDB();

  const results = await Product.find({
    $or: [{ name: caseInsensitiveRegex }, { description: caseInsensitiveRegex }],
  })
    .sort({ createdAt: -1 })
    .limit(MAX_RESULTS)
    .lean();

  const serialized = results.map((product) => ({
    id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    rating: product.rating,
    photo_path: product.photo_path,
    stock: product.stock,
    category: product.category,
  }));

  return NextResponse.json(serialized);
}
