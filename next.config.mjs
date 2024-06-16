/** @type {import('next').NextConfig} */
const prefix = process.env.NODE_ENV === 'production' ? 'https://tkddnr924.github.io/' : ''

const nextConfig = {
  output: 'export',
  assetPrefix: prefix,
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;
