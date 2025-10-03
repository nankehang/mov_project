import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import { authOptions } from "@/lib/authOptions";

function isAdmin(session) {
  return session?.user?.role === "admin";
}

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  const serialized = products.map((product) => ({
    ...product,
    id: product._id.toString(),
    _id: undefined,
    createdAt: product.createdAt?.toISOString?.(),
    updatedAt: product.updatedAt?.toISOString?.(),
  }));
  return NextResponse.json(serialized);
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    name,
    description,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    photo_path,
  } = body;

  const parsedPrice = Number(price);
  const parsedOriginalPrice =
    originalPrice === undefined ? undefined : Number(originalPrice);
  const parsedDiscount = discount === undefined ? undefined : Number(discount);
  const parsedRating = rating === undefined ? undefined : Number(rating);
  const parsedReviews = reviews === undefined ? undefined : Number(reviews);

  if (!name || !description || Number.isNaN(parsedPrice)) {
    return NextResponse.json(
      { error: "name, description, and a valid price are required." },
      { status: 400 }
    );
  }

  await connectDB();

  const product = await Product.create({
    name,
    description,
    price: parsedPrice,
    originalPrice: Number.isNaN(parsedOriginalPrice)
      ? undefined
      : parsedOriginalPrice,
    discount: Number.isNaN(parsedDiscount) ? undefined : parsedDiscount,
    rating: Number.isNaN(parsedRating) ? undefined : parsedRating,
    reviews: Number.isNaN(parsedReviews) ? undefined : parsedReviews,
    photo_path: photo_path ?? "",
  });

  return NextResponse.json(
    {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      rating: product.rating,
      reviews: product.reviews,
    photo_path: product.photo_path,
    },
    { status: 201 }
  );
}

export const dynamic = "force-dynamic";
