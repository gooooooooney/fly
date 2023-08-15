/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
        protocol: 'https',
      },
      {
        hostname: 'unsplash.com',
        protocol: 'https',
      },
      {
        hostname: 'images.pexels.com',
        protocol: 'https',
      },
      {
        hostname: 'plus.unsplash.com',
        protocol: 'https',
        pathname: "**"
      },
    ]
  },
  webpack: (config) => {
    const TerserPlugin = require('terser-webpack-plugin');
    return {
      ...config,
      optimization: {
        ...config.optimization,
        // Using TerserPlugin created by Next.js breaks the editor, so we create a custom one.
        // About the error: https://github.com/TypeCellOS/BlockNote/issues/292
        // TerserPlugin Option reference: https://github.com/vercel/next.js/blob/5f9d2c55ca3ca3bd6a01cf60ced69d3dd2c64bf4/packages/next/src/build/webpack-config.ts#L1151
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
              },
              output: {
                ecma: 5,
                safari10: true,
                comments: false,
                ascii_only: true,
              },
              mangle: {
                safari10: true,
              },
            },
          }),
          config.optimization.minimizer[1],
        ],
      },
    };
  },
}
console.log(process.env.POSTGRES_URL);
console.log(process.env.NODE_ENV);
module.exports = nextConfig
