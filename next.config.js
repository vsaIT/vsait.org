/** @type {import('next').NextConfig} */
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.gitignore$/,
      loader: 'ignore-loader',
    })
    return config
  },
}
