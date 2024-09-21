const nextConfig = {
  reactStrictMode: true,
  output: "export",
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_USER_BACKEND_URL_PREFIX:
      process.env.NEXT_PUBLIC_USER_BACKEND_URL_PREFIX,
    NEXT_PUBLIC_PAYMENTS_BACKEND_URL_PREFIX:
      process.env.NEXT_PUBLIC_PAYMENTS_BACKEND_URL_PREFIX,
  },
};

module.exports = nextConfig;
