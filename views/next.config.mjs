/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compress: true,
    poweredByHeader: false,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'h-htransports.com',
        },
      ],
    },
  };
  
  export default nextConfig;
  

  