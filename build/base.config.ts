/* eslint-disable @typescript-eslint/naming-convention */
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';

const getStyleLoaders = (isCssModules?: boolean, isLess?: boolean) => {
  const loaders = [
    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: isLess ? 2 : 1,
        sourceMap: !isProduction,
        modules: isCssModules
          ? {
              mode: 'local',
              auto: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              localIdentContext: path.resolve(__dirname, '../src'),
              exportLocalsConvention: 'camelCaseOnly',
              exportGlobals: true,
            }
          : undefined,
      },
    },
    'postcss-loader',
  ];
  if (isLess) {
    loaders.push('less-loader');
  }
  return loaders;
};

const baseConfig: Configuration = {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              sourceMaps: !isProduction,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /.less$/,
        exclude: /\.module\.less$/,
        sideEffects: true,
        use: getStyleLoaders(false, true),
      },
      {
        test: /\.module\.less$/,
        use: getStyleLoaders(true, true),
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: getStyleLoaders(),
      },
      {
        test: /\.module\.css$/,
        use: getStyleLoaders(true),
      },
      {
        exclude: [
          /\.(js|mjs|jsx|ts|tsx)$/,
          /\.html$/,
          /\.json$/,
          /\.(css|sass|scss|less)$/,
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 8,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      minify: isProduction
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : undefined,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@src': path.resolve(__dirname, '../src'),
    },
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
};

export default baseConfig;
