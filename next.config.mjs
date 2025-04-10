import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.SUPA_PROJECT_URL,
        pathname: '/storage/v1/object/sign/our-planet-earth/media/*',
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
