import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import { authOptions } from "@/lib/authOptions";

function isAdmin(session) {
  return session?.user?.role === "admin";
}

export async function GET(_request, { params }) {
  const { id } = await params;
  await connectDB();
  const product = await Product.findById(id).lean();

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...product,
    id: product._id.toString(),
    _id: undefined,
    createdAt: product.createdAt?.toISOString?.(),
    updatedAt: product.updatedAt?.toISOString?.(),
  });
}

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const payload = await request.json();

  const updates = { ...payload };
  if (payload.price !== undefined) {
    const parsed = Number(payload.price);
    if (Number.isNaN(parsed)) {
      return NextResponse.json(
        { error: "Price must be a valid number" },
        { status: 400 }
      );
    }
    updates.price = parsed;
  }
  if (payload.originalPrice !== undefined) {
    const parsed = Number(payload.originalPrice);
    updates.originalPrice = Number.isNaN(parsed) ? undefined : parsed;
  }
  if (payload.discount !== undefined) {
    const parsed = Number(payload.discount);
    updates.discount = Number.isNaN(parsed) ? undefined : parsed;
  }
  if (payload.rating !== undefined) {
    const parsed = Number(payload.rating);
    updates.rating = Number.isNaN(parsed) ? undefined : parsed;
  }
  if (payload.reviews !== undefined) {
    const parsed = Number(payload.reviews);
    updates.reviews = Number.isNaN(parsed) ? undefined : parsed;
  }
  if (payload.photo_path !== undefined && !payload.photo_path) {
    updates.photo_path = "";
  }

  await connectDB();
  const product = await Product.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).lean();

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...product,
    id: product._id.toString(),
    _id: undefined,
    createdAt: product.createdAt?.toISOString?.(),
    updatedAt: product.updatedAt?.toISOString?.(),
  });
}

export async function DELETE(_request, { params }) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();
  const product = await Product.findByIdAndDelete(id).lean();

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export const dynamic = "force-dynamic";
