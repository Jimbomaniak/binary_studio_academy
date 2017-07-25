let webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: 'eval-source-map',
    entry: './index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                },
                include: __dirname
            },
            {
                test: /\.css?$/,
                loaders: ['style-loader', 'css-loader'],
                include: __dirname
            }
        ]
    }
};