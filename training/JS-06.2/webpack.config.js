let webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: 'eval-source-map',
    entry: './src/js/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                enforce: 'pre',
                test: /\.css$/,
                use: 'postcss-loader'
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'eslint-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    'url-loader?limit=100000',
                    'img-loader'
                ]
            }
        ]
    },
    plugins: [new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
            warnings: false,
            sequences: true,
            join_vars: true,
        },
        output: {
            beautify: false,
            comments: false,
        }
    })],
    devServer: {
        inline: true,
        port: 4321
    }
};