require('dotenv').config()

module.exports = {
  siteUrl: process.env.WEBSITE_URL,
  generateRobotsTxt: true,
  // optional
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.WEBSITE_URL}/my-custom-sitemap-1.xml`,
      `${process.env.WEBSITE_URL}/my-custom-sitemap-2.xml`,
      `${process.env.WEBSITE_URL}/my-custom-sitemap-3.xml`,
    ],
  },
}
