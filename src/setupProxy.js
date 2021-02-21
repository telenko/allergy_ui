const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://telenko-allergy.herokuapp.com',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // remove base path
      }
    })
  );
};