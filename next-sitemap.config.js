/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://tatti-shef.ru',
  generateRobotsTxt: true,
  outDir: './public',
  additionalPaths: async (config) => {
    const now = new Date().toISOString();
    return [
      { loc: '/', lastmod: now },
      { loc: '/menu', lastmod: now },
      { loc: '/cakes', lastmod: now },
      { loc: '/contacts', lastmod: now },
      { loc: '/delivery', lastmod: now },
      { loc: '/services', lastmod: now },
    ];
  },
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
