import webpack from 'webpack';
import webpackDevConfig from './dev.config';
import detectPort from 'detect-port';
import WebpackDevServer from 'webpack-dev-server';

const options: WebpackDevServer.Configuration = {
  hot: true,
  historyApiFallback: true,
  open: true,
  liveReload: true,
  stats: {
    errors: true,
    errorDetails: true,
    warnings: true,
    colors: true,
    timings: true,
    all: false,
  },
  overlay: {
    warnings: false,
    errors: true,
  },
};

WebpackDevServer.addDevServerEntrypoints(webpackDevConfig, options);

const compiler = webpack(webpackDevConfig);
const server = new WebpackDevServer(compiler, options);

let port = 8080;

async function startDevServer() {
  const _port = await detectPort(port);
  if (_port === port) {
    server.listen(port);
    return;
  }
  port += 1;
  await startDevServer();
}

startDevServer();
