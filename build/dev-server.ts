import webpack from 'webpack';
import webpackDevConfig from './dev.config';
import detectPort from 'detect-port';
import WebpackDevServer from 'webpack-dev-server';

const options: WebpackDevServer.Configuration = {
  historyApiFallback: true,
  open: true,
  hot: true,
  liveReload: true,
  client: {
    overlay: {
      warnings: false,
      errors: true,
    },
  },
};

const compiler = webpack(webpackDevConfig);
let port = 8080;

async function startDevServer() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _port = await detectPort(port);
  if (_port === port) {
    options.port = port;
    const server = new WebpackDevServer(options, compiler);
    await server.start();
    return;
  }
  port += 1;
  await startDevServer();
}

startDevServer();
