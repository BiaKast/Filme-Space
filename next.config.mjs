/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org"], // Adicione o domínio permitido aqui
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
