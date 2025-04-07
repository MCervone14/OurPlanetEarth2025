import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'unsplash.it'],
  },
  productionBrowserSourceMaps: true,
}

export default withPayload(nextConfig)
