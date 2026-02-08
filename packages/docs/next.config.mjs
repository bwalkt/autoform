import path from 'node:path'
import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    externalDir: true,
  },
  transpilePackages: ['@bwalkt/ui'],
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(process.cwd(), '../ui/src'),
    }
    return config
  },
}

export default withMDX(nextConfig)
