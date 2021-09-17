module.exports = {
  siteUrl: process.env.SITE_URL || 'https://defiscan.live',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{
      userAgent: '*',
      allow: '/',
      disallow: '/*?network=*'
    }]
  }
}
