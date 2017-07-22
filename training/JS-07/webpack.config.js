let webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: 'eval-source-map',
    entry: './src/ts/fightClub.ts',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'eslint-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
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