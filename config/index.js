module.exports = {
  dev: {
    env: 'development',
    port: 8080,
    publicPath: "/"
  },
  prod: {
    env: 'production',
    publicPath: "/",
    port: 8088
  },
  // node服务器接口代理
  proxyTable: {}
};