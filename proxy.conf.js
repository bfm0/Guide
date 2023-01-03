const PROXY_CONFIG = [
  {
    context: ["/api"],
    target: "https://query2.finance.yahoo.com",
    secure: true,
    pathRewrite: { "^/api": "" },
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
