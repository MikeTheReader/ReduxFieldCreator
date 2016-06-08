var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');


module.exports = {
    // or devtool: 'eval' to debug issues with compiled output:
    devtool: 'cheap-module-eval-source-map',
    entry: [
        // necessary for hot reloading with IE:
        //'eventsource-polyfill',
        // listen to code updates emitted by hot middleware:
        //'webpack-hot-middleware/client',
        // your code:
        './src'
    ],
    output: {
        path: path.join(__dirname, 'fields_project/dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new BundleTracker({filename: './webpack-stats.json'}),
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
};
