const path = require('path')
const merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;
const webpack = require('webpack');
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const common = {
    // Entry accepts a path or an object of entries.
    // The build chapter contains an example of the latter.
    entry: PATHS.app,
    resolve: {
      extensions: ['','.js','.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    }
};

// Default configuration
if (TARGET === 'start' || !TARGET) {

    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            contentBase: PATHS.build,
            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env so this is easy to customize.
            host: process.env.HOST,
            port: process.env.PORT
        },
        module: {
            loaders: [{
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: PATHS.app
            },{
              test: /\.jsx?$/,
              loaders: ['babel?cacheDirectory'],
              incldue: PATHS.app
            }]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}


if (TARGET === 'build') {
    module.exports = merge(common, {});
}