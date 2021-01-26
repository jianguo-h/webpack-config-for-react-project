import { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackBaseConfig from './base.config';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';

const devConfig: Configuration = webpackMerge(webpackBaseConfig, {
  devtool: 'eval-cheap-module-source-map',
  mode: 'development',
  output: {
    filename: 'static/js/[name].[fullhash:8].js',
  },
  plugins: [
    new ESLintWebpackPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      emitWarning: true,
      emitError: true,
    }),
  ],
});

export default devConfig;
