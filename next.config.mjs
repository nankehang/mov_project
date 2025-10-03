// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: false, // แก้ปัญหา lightningcss บน Railway
  },
};

module.exports = nextConfig;
