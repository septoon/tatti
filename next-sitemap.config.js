/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://tatti-shef.ru',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
