/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // appDir: true,
        // serverComponentsExternalPackages:[
        //     '@prisma/client', 'bcrypt'
        // ]
    },
    webpack: (config) => {
        config.externals = [...config.externals, 'bcrypt'];
        return config;
    },
    images: {
        domains: ['firebasestorage.googleapis.com'],
      },
};

export default nextConfig;