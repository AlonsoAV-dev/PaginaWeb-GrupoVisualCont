/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removido 'output: export' para permitir API routes dinámicas
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;