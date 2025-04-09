import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: process.env.S3_ENDPOINT,
          pathname: '/storage/v1/s3/our-planet-earth/*',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
        },
      ],
    },
  },
  productionBrowserSourceMaps: true,
}

export default withPayload(nextConfig)
