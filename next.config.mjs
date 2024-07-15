/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["content.gotoliquorstore.com"],
    },
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
    },
};

export default nextConfig;
