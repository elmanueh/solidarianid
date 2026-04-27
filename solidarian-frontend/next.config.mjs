import { withSerwist } from '@serwist/turbopack';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: projectRoot,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_GATEWAY_URL ?? ''}/api/:path*`,
      },
      {
        source: '/photos',
        destination: `${process.env.NEXT_PUBLIC_GATEWAY_URL ?? ''}/photos`,
      },
      {
        source: '/graphql',
        destination: `${process.env.NEXT_PUBLIC_GATEWAY_URL ?? ''}/graphql`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
};

export default withSerwist(nextConfig);
