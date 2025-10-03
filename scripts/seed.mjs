import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Product from "../models/Product.js";
import User from "../models/User.js";

const dbModule = await import("../lib/db.js");
const connectDB = dbModule.connectDB || dbModule.default?.connectDB;

if (typeof connectDB !== "function") {
  throw new Error("connectDB function could not be loaded from lib/db.js");
}

const seedModule = await import("../data/seedProducts.js");
const seedProducts =
  seedModule.seedProducts ||
  seedModule.default?.seedProducts ||
  seedModule.default;

if (!Array.isArray(seedProducts)) {
  throw new Error("seedProducts array could not be loaded from data/seedProducts.js");
}

async function seed() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be defined in your environment before seeding."
    );
  }

  await connectDB();

  console.log("🧹 Clearing existing data...");
  await Product.deleteMany({});
  await User.deleteMany({ email: adminEmail.toLowerCase() });

  console.log("🛍️ Creating sample products...");
  await Product.insertMany(seedProducts);

  console.log("👤 Creating admin user...");
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  await User.create({
    email: adminEmail.toLowerCase(),
    password: hashedPassword,
    role: "admin",
    name: "Store Admin",
  });

  console.log("✅ Seed completed successfully.");
}

seed()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
