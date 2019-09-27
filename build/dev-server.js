const express = require('express');
const webpack = require('webpack');
const config = require('../config');
const webpackDevConfig = require('./dev.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const devPort = config.dev.port;
const url = 'http://localhost:' + devPort;
const compiler = webpack(webpackDevConfig);

// 当环境变量不存在时设置为开发环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const devMiddlewareInstance = webpackDevMiddleware(compiler, {
  stats: { colors: true }
});
const hotMiddlewareInstance = webpackHotMiddleware(compiler);

compiler.hooks.compilation.tap('HtmlWebpackPlugin', compilation => {
  compilation.hooks.htmlWebpackPluginAfterEmit.tap('HtmlWebpackPlugin', () => {
    webpackHotMiddlewareInstance.publish({
      action: 'reload'
    });
  });
});

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
