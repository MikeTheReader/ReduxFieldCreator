var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var config = require('./webpack.base.config.js');

config.devtool = 'cheap-module-eval-source-map';

// Use webpack dev server
config.entry = [
    'webpack-dev-server/client?http://10.5.1.23:3000',
    'webpack/hot/only-dev-server',
    './src'
];

// override django's STATIC_URL for webpack bundles
config.output.publicPath = 'http://10.5.1.23:3000/fields_project/dist';

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BundleTracker({filename: './webpack-stats.json'}),
])

// Add a loader for JSX files with react-hot enabled
config.module.loaders.push(
    {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
    }
);

module.exports = config







