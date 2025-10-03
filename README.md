## hmoobwin Commerce Platform

This project is now a fully dynamic e-commerce showcase powered by **Next.js 15**, **MongoDB**, **NextAuth.js**, and **Tailwind CSS**. Storefront shoppers see products pulled from MongoDB, while administrators can sign in to manage the catalog through a protected dashboard.

## Prerequisites

- Node.js 18.18+ or 20+
- A MongoDB connection string (Atlas or self-hosted)

## 1. Environment setup

1. Duplicate `.env.example` to `.env.local`.
2. Fill in the values:
	- `MONGODB_URI` – your MongoDB connection string
	- `NEXTAUTH_SECRET` – generate with `openssl rand -base64 32`
	- `NEXTAUTH_URL` – usually `http://localhost:3000` in development
	- `ADMIN_EMAIL` / `ADMIN_PASSWORD` – bootstrap credentials for the seed script

## 2. Install dependencies

```bash
npm install
```

## 3. Seed initial data (optional but recommended)

Populate MongoDB with the sample catalog and an admin user:

```bash
npm run seed
```

## 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to browse the storefront. Products are served directly from MongoDB.

## Admin workflow

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login).
2. Sign in with the admin credentials you set in `.env.local` (or via the seed script).
3. Use the dashboard to create, edit, or delete products. All operations go through authenticated API routes backed by MongoDB.

## Project structure highlights

- `lib/db.js` – centralized MongoDB connection (Mongoose)
- `models/Product.js` & `models/User.js` – data models with validation
- `app/api/products/*` – authenticated CRUD API endpoints
- `app/api/auth/[...nextauth]` – NextAuth.js credential-based auth
- `app/admin/*` – protected admin dashboard pages
- `scripts/seed.mjs` – utility script to bootstrap data

## Deployment notes

Set the same environment variables on your hosting provider (Vercel, etc.). Ensure `NEXTAUTH_URL` matches the deployed domain, and rerun the seed script or create users directly in MongoDB if needed.
