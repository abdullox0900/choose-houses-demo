import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    appDir: true,
    images: {
        domains: ['images.unsplash.com', 'uytanla.uz', 'https://uytanla.uz', 'api-maps.yandex.ru', 'core-renderer-tiles.maps.yandex.net', 'uytanla.uzhttps', 'nyc3.digitaloceanspaces.com'],
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "upgrade-insecure-requests"
                    },
                ],
            },
        ]
    },
}

export default withNextIntl(nextConfig)