import webpack, { Configuration, Entry } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackBaseConfig from './base.config';

// config hot module
const hots = [
  /* 'react-hot-loader/patch',  */ 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
];
const baseConfigEntry = webpackBaseConfig.entry;
const devConfigEntry: Entry = {};
if (typeof baseConfigEntry === 'object' && !Array.isArray(baseConfigEntry)) {
  Object.keys(baseConfigEntry).forEach(entryName => {
    devConfigEntry[entryName] = hots.concat(
      baseConfigEntry[entryName] as string
    );
  });
}

const devConfig: Configuration = webpackMerge(webpackBaseConfig, {
  devtool: 'eval-cheap-module-source-map',
  mode: 'development',
  entry: devConfigEntry,
  output: {
    filename: 'static/js/[name].[fullhash:8].js',
  },
  stats: {
    colors: true,
  },
  module: {
    rules: [
      {
        test: /.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});

export default devConfig;
