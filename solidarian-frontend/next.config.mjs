import { withSerwist } from '@serwist/turbopack';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(fileURLToPath(import.meta.url));

function getGatewayUrl() {
  const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL?.trim();

  if (gatewayUrl) {
    return gatewayUrl.replace(/\/+$/, '');
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('NEXT_PUBLIC_GATEWAY_URL is required in production.');
  }

  return 'http://localhost:8090';
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: projectRoot,
  },
  async rewrites() {
    const gatewayUrl = getGatewayUrl();

    return [
      {
        source: '/api/:path*',
        destination: `${gatewayUrl}/api/:path*`,
      },
      {
        source: '/graphql',
        destination: `${gatewayUrl}/graphql`,
      },
      {
        source: '/photos',
        destination: `${gatewayUrl}/photos`,
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
