import path from 'path';
import webpack, { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackBaseConfig from './base.config';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const webpackProdConfig: Configuration = webpackMerge(webpackBaseConfig, {
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
          drop_console: true,
          drop_debugger: true
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

export default webpackProdConfig;
