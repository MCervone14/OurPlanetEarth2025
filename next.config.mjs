import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'our-planet-earth2025.vercel.app',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  productionBrowserSourceMaps: true,
}

export default withPayload(nextConfig)
