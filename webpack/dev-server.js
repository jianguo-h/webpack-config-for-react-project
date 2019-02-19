const Koa = require('koa');
const webpack = require('webpack');
const config = require('../config');
const webpackDevConfig = require('./dev.config');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');

const app = new Koa();
const devPort = config.dev.port;
const url = 'http://localhost:' + devPort;
const compiler = webpack(webpackDevConfig);

// 当环境变量不存在时设置为开发环境
if(!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const devMiddlewareInstance = devMiddleware(compiler, {
  stats: { colors: true }
});
const hotMiddlewareInstance = hotMiddleware(compiler);

// use middleware
app.use(devMiddlewareInstance);
app.use(hotMiddlewareInstance);

let _resolve;
new Promise(resolve => {
  _resolve = resolve;
});

devMiddlewareInstance.waitUntilValid(() => {
  console.log('dev server start at ' + url);
  _resolve();
});

app.listen(devPort);