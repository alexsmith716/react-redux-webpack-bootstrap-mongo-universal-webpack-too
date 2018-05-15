const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { clientConfiguration } = require('universal-webpack');

const settings = require('./universal-webpack-settings');
const base_configuration = require('./webpack.config');

// With `development: false` all CSS will be extracted into a file
// named '[name]-[contenthash].css' using `mini-css-extract-plugin`.
const configuration = clientConfiguration(base_configuration, settings, { development: false, useMiniCssExtractPlugin: true });

const bundleAnalyzerPath = path.resolve(configuration.context, './build/analyzers/bundleAnalyzer');
const visualizerPath = path.resolve(configuration.context, './build/analyzers/visualizer');
const assetsPath = path.resolve(configuration.context, './build/public/assets');
const serverPath = path.resolve(configuration.context, './build/server');

// configuration.devtool = 'source-map';
configuration.devtool = 'hidden-source-map';

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// PLUGINS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

configuration.plugins.push(

  new CleanWebpackPlugin([bundleAnalyzerPath,visualizerPath,assetsPath,serverPath], { root: configuration.context }),

  new webpack.DefinePlugin({
    'process.env': {
      CLIENT: JSON.stringify(false),
      NODE_ENV  : JSON.stringify('production'),
    },
    __CLIENT__: false,
    __SERVER__: true,
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false,
  }),

  // https://blog.etleap.com/2017/02/02/inspecting-your-webpack-bundle/
  new Visualizer({
    // Relative to the output folder
    filename: '../../analyzers/visualizer/bundle-stats.html'
  }),

  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: '../../analyzers/bundleAnalyzer/client-development.html',
    // analyzerMode: 'server',
    // analyzerPort: 8888,
    // defaultSizes: 'parsed',
    openAnalyzer: false,
    generateStatsFile: false
  }),

);

export default configuration;
