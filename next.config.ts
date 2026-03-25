import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'magical-apparel-d21fac2dcd.media.strapiapp.com',
            },
            {
                protocol: "https",
                hostname: "foodfriends.ru",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: true
    }
};

export default nextConfig;
