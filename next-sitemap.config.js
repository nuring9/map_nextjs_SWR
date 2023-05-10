/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.SITE_URL || 'https://vercel.com/nuring9/map-nextjs/deployments',
  generateRobotsTxt: true, // (optional)
  // ...other options
};
