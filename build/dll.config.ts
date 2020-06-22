// 项目中的三方库放在这里统一打包，比如react全家桶, axios等ajax库, 以及一些ui库(如ant-design等)

import path from 'path';
import webpack, { Configuration } from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { LIBS_PATH } from './constant';

const dllConfig: Configuration = {
  mode: 'production',
  entry: {
    libs: ['react', 'react-dom'],
  },
  output: {
    path: LIBS_PATH,
    filename: '[name].[contenthash:8].js',
    library: '[name]_library',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]_library',
      path: path.resolve(LIBS_PATH, '[name]-manifest.json'),
    }),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      uglifyOptions: {
        warnings: false,
        output: {
          comments: false,
        },
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    }),
  ],
};

webpack(dllConfig, (errout, stats) => {
  if (errout) throw errout;
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n'
  );
});
