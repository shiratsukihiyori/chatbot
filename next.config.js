/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // Force webpack build worker to avoid Turbopack issues
    webpackBuildWorker: false,
    // Disable server components external packages as it can cause issues with bcrypt-ts
    serverComponentsExternalPackages: []
  },
  
  // Configure images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vercel.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  
  // Configure CORS headers
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ]
  },
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Add Node.js core module polyfills
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/')
    };

    // Remove bcrypt-ts alias as we're using bcryptjs instead
    if (config.resolve.alias && config.resolve.alias['bcrypt-ts']) {
      delete config.resolve.alias['bcrypt-ts'];
    }

    return config;
  }
};

module.exports = nextConfig;
