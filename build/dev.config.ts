import webpack, { Configuration, Entry } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackBaseConfig from './base.config';

// config hot module
const hots = [
  /* 'react-hot-loader/patch',  */ 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
];
Object.keys(webpackBaseConfig.entry as Entry).forEach(entryName => {
  if (webpackBaseConfig.entry) {
    (webpackBaseConfig.entry as Entry)[entryName] = hots.concat(
      (webpackBaseConfig.entry as Entry)[entryName]
    );
  }
});

const devConfig: Configuration = webpackMerge(webpackBaseConfig, {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});

export default devConfig;
