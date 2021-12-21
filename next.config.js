const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `default-src 'none';` +
      `base-uri 'none';` +
      `form-action 'none';` +
      `frame-ancestors 'none';` +
      `img-src 'self';` +
      `media-src 'self';` +
      `object-src 'none';` +
      `script-src 'self' ${process.env.NODE_ENV === 'development' ? `'unsafe-eval'` : ''};` +
      `style-src 'self' fonts.googleapis.com 'unsafe-inline';` +
      `font-src fonts.gstatic.com;` +
      `connect-src 'self' ocean.defichain.com;`
  },
  {
    key: 'Referrer-Policy',
    value: 'same-origin',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  }
]

module.exports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts'],
  async headers () {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
