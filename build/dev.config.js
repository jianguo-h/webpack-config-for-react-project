/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const Jarvis = require('webpack-jarvis');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./base.config');

// config hot module
const hots = [
  /* 'react-hot-loader/patch',  */ 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
];
Object.keys(webpackBaseConfig.entry).forEach(entryName => {
  webpackBaseConfig.entry[entryName] = hots.concat(
    webpackBaseConfig.entry[entryName]
  );
});

const webpackDevConfig = webpackMerge(webpackBaseConfig, {
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 打包性能分析
    new Jarvis({
      port: 1337 // 浏览器中打开 localhost:1337查看打包性能分析
    })
  ]
});

module.exports = webpackDevConfig;
