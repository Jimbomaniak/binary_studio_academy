let webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');
let config = require('./webpack.config');

let app = new require('express')();

let compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

app.get('/', function (req, res) {
    res.sendFile(__dirname + './public/index.html');
});

app.listen(4321, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.info('App is running on port: 4321');
    }
});