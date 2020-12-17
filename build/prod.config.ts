import webpack, { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackBaseConfig from './base.config';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';

const webpackProdConfig: Configuration = webpackMerge(webpackBaseConfig, {
  mode: 'production',
  devtool: false,
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'postcss-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // 每次打包前清除dist目录
    new CleanWebpackPlugin(),
    // 提取less和css
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          map: false,
        },
        cssProcessorPluginOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              minifyFontValues: { removeQuotes: false },
            },
          ],
        },
        canPrint: true,
      }),
      new TerserWebpackPlugin({
        parallel: true,
        sourceMap: false,
        extractComments: false,
        terserOptions: {
          keep_fnames: false,
          keep_classnames: false,
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            comparisons: false,
          },
          output: {
            ascii_only: true,
            comments: false,
          },
        },
      }),
    ],
  },
});

export default webpackProdConfig;
