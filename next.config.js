/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'ddragon.leagueoflegends.com',
                port: '',
                pathname: '/**'
            }
        ]
    }
}

module.exports = nextConfig
