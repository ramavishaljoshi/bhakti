/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Build a fully static site into ./out — works on Cloudflare Pages (and any
  // static host) with no server, and never ships the .next/webpack cache that
  // tripped Cloudflare's 25 MiB per-file limit.
  output: "export",
  images: {
    // next/image optimization needs a server; static export has none.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
