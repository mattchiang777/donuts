/* eslint-disable no-var */
const webpack = require('webpack')
const path = require('path')

const Dashboard = require('webpack-dashboard')
const DashboardPlugin = require('webpack-dashboard/plugin')
const dashboard = new Dashboard()

module.exports = {
	entry: [
		'webpack-dev-server/client?http://' + require('ip').address() + ':5000',
		'whatwg-fetch',
		'webpack/hot/dev-server',
		'./src/index'
	],

	output: {
		path: __dirname,
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	resolve: {
		modules: [
			path.join(__dirname, 'src'),
			'node_modules'
		],
		extensions: ['.js']
	},
	
	devtool: 'eval',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new DashboardPlugin(dashboard.setData),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development')
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loaders: ['babel-loader'],
				exclude: /node_modules/
				// include: path.join(__dirname, 'src')
			},
			{ 
				test: /\.styl$/, 
				use: [
					'style-loader', 
					'css-loader', 
					{
						loader: 'stylus-loader',
						options: {
							use: [require('nib')(), require('jeet')(), require('rupture')()],
							import: [
								'~nib/lib/nib/index.styl', 
								'~jeet/styl/index.styl',
								'~rupture/rupture/index.styl'
							]
						},
					},
				]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				loaders: [
					'file-loader', 
					{
						loader: 'image-webpack-loader',
						options: {
							gifsicle: {
								interlaced: false,
							},
							optipng: {
								optimizationLevel: 7,
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
							mozjpeg: {
								progressive: true,
								quality: 65
							}
						}
					}
				]
			},
			{
				test   : /\.(ttf|eot|otf|woff(2))(\?[a-z0-9]+)?$/,
				loaders: [
					'file-loader'
				]
			}
		]
	}
}
