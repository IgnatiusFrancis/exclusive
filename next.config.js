// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*.html',
      },
      // Add more rewrite rules for other pages as needed
    ];
  },
};
