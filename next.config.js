/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    appDir: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
