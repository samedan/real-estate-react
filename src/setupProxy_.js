// const proxy = require('http-proxy-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function () {
  app.use(
    '/api',
    // proxy({target: 'http://localhost:3001', changeOrigin: true })
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
};
