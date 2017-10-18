/* eslint-disable no-var, strict */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	quiet: true
	// displayReasons: true,
	// displayChunks: true,
	// watch: true,
	// loglevel: 'verbose'
}).listen(5000, '0.0.0.0', function (err) {
	if (err) {
		console.log(err);
	}

	console.log('Listening at localhost:5000');
 });
