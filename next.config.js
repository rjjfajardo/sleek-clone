/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  transpilePackages: ["@mui/x-charts"],
};

module.exports = nextConfig;
