// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow external images you actually use with <Image />
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      // Add more if you use them later:
      // { protocol: "https", hostname: "your-cdn.example.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;