let webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: 'eval-source-map',
    entry: './src/ts/fightClub.ts',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [__dirname + '/src/ts', 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: __dirname + '/src/css'
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: __dirname + '/src/ts'
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'eslint-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
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