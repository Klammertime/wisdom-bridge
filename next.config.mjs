/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/call',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://meet.jit.si https://*.jitsi.net;",
          },
        ],
      },
    ]
  },
}

export default nextConfig