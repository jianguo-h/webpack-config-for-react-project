import express from 'express';
import webpack from 'webpack';
import webpackDevConfig from './dev.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import connectHistory from 'connect-history-api-fallback';
import open from 'open';

const app = express();
const port = 8080;
const url = 'http://localhost:' + port;
const compiler = webpack(webpackDevConfig);

const devMiddlewareInstance = webpackDevMiddleware(compiler);
const hotMiddlewareInstance = webpackHotMiddleware(compiler);

app.use(connectHistory());

// use middleware
app.use(devMiddlewareInstance);
app.use(hotMiddlewareInstance);

devMiddlewareInstance.waitUntilValid(async () => {
  console.log('dev server start at ' + url);
  await open(url);
});

app.listen(port);
