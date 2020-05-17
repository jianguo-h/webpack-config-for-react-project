import express from 'express';
import webpack from 'webpack';
import webpackDevConfig from './dev.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import open from 'open';
import { DEV_PORT } from './constant';

const app = express();
const url = 'http://localhost:' + DEV_PORT;
const compiler = webpack(webpackDevConfig);

const devMiddlewareInstance = webpackDevMiddleware(compiler, {
  publicPath: webpackDevConfig.output?.publicPath ?? '/',
  stats: { colors: true },
});
const hotMiddlewareInstance = webpackHotMiddleware(compiler);

/* compiler.hooks.compilation.tap('HtmlWebpackPlugin', compilation => {
  compilation.hooks.htmlWebpackPluginAfterEmit.tap('HtmlWebpackPlugin', () => {
    hotMiddlewareInstance.publish({
      action: 'reload'
    });
  });
}); */

// use middleware
app.use(devMiddlewareInstance);
app.use(hotMiddlewareInstance);

devMiddlewareInstance.waitUntilValid(async () => {
  console.log('dev server start at ' + url);
  await open(url);
});

app.listen(DEV_PORT);
