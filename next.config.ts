import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type errors ki wajah se build fail na ho
    ignoreBuildErrors: true,
  },
  // GitHub Pages ke liye static HTML export zaroori hai
  output: 'export',
  images: {
    // GitHub Pages par server image optimization nahi chalta
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // EduBridge repo ke liye routing aur CSS/JS asset paths
  basePath: '/EduBridge',
  assetPrefix: '/EduBridge',
  trailingSlash: true,

  transpilePackages: ['motion'],
  webpack: (config, {dev}) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
