import express from 'express';
import webpack from 'webpack';
import webpackDevConfig from './dev.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = express();
const devPort = process.env.PORT ?? 8080;
const url = 'http://localhost:' + devPort;
const compiler = webpack(webpackDevConfig);

const devMiddlewareInstance = webpackDevMiddleware(compiler, {
  publicPath: webpackDevConfig.output?.publicPath ?? '/',
  stats: { colors: true }
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

devMiddlewareInstance.waitUntilValid(() => {
  console.log('dev server start at ' + url);
});

app.listen(devPort);
