/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Build a fully static site into ./out — works on Cloudflare Pages (and any
  // static host) with no server, and never ships the .next/webpack cache that
  // tripped Cloudflare's 25 MiB per-file limit.
  output: "export",
  // Force single-threaded page-data collection. The parallel jest-workers race
  // on Windows and intermittently throw "Cannot find module './NNN.js'" during
  // "Collecting page data". One worker is slightly slower but builds reliably.
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  // Export each route as a folder with index.html (e.g. /about -> about/index.html)
  // so clean URLs resolve on directory-style hosts (Apache/XAMPP, nginx, `serve`),
  // not only hosts that auto-map /about -> about.html (Cloudflare Pages, next dev).
  trailingSlash: true,
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
