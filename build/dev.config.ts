import webpack, { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackBaseConfig from './base.config';

const devConfig: Configuration = webpackMerge(webpackBaseConfig, {
  devtool: 'eval-cheap-module-source-map',
  mode: 'development',
  output: {
    filename: 'static/js/[name].[fullhash:8].js',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});

export default devConfig;
