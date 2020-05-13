/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./base.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpackProdConfig = webpackMerge(webpackBaseConfig, {
  mode: 'production',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'postcss-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    // 每次打包前清除dist目录
    new CleanWebpackPlugin(),
    // dllPlugin
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../app/libs/libs-manifest.json')
    }),
    // 将dllplugin生成的js自动注入到html中
    new AddAssetHtmlPlugin({
      publicPath: '/static/js/',
      filepath: path.resolve(__dirname, '../dll/*.js'),
      outputPath: 'static/js'
    }),
    // 提取less和css
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash:8].css',
      chunkFilename: 'static/css/[name].[chunkhash:8].css'
    }),
    // 压缩css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
    // 压缩混淆js
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false, // 删除警告
        compress: {
          drop_console: true, // eslint-disable-line @typescript-eslint/camelcase
          drop_debugger: true // eslint-disable-line @typescript-eslint/camelcase
        },
        output: {
          comments: false // 去除注释
        }
      },
      cache: true, // 使用缓存
      parallel: true // 开启多线程压缩
    })
  ]
});

module.exports = webpackProdConfig;
