/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.qrserver.com',
                port: '',
            }
        ]
    },
    transpilePackages: ['lucide-react']
};

export default nextConfig;
