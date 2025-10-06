import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { uploadToSpaces, validateImageFile } from "@/lib/digitalocean";

export async function POST(request) {
  try {
    // Check authentication
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    // Get form data
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Validate file
    try {
      validateImageFile(file);
    } catch (validationError) {
      return NextResponse.json(
        { error: validationError.message },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to DigitalOcean Spaces
    const publicUrl = await uploadToSpaces(
      buffer,
      file.name,
      file.type
    );

    return NextResponse.json({
      success: true,
      url: publicUrl,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
