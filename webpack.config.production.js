/* eslint-disable no-var */

const webpack = require('webpack')
const path = require('path')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	entry: [
		'./src/index'
	],

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: ''
	},
	resolve: {
		modules: [
			path.join(__dirname, 'src'),
			'node_modules'
		],
		extensions: ['.js']
	},
	
	devtool: 'nosources-source-map',

	plugins: [
		new CleanWebpackPlugin(['dist/assets', 'dist/bundle.js']),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new UglifyJSPlugin()
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
					{	
						loader: 'file-loader',
						options: {
							name: 'assets/images/[hash].[ext]'
						}
					}, 
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
							},
							
							// Specifying webp here will create a WEBP version of your JPG/PNG images
							// webp: {
							// 	quality: 75
							// }
						}
					}
				]
			},
			{
				test   : /\.(ttf|eot|otf|woff(2))(\?[a-z0-9]+)?$/,
				loader: 'file-loader',
				options: {
					name: 'assets/fonts/[hash].[ext]'
				} 
			},
			// {
			// 	test   : /\.(mp4)(\?[a-z0-9]+)?$/,
			// 	loader : 'file-loader?name=assets/videos/[hash].[ext]'
			// }
		]
	},
	
	// stylus: {
	// 	preferPathResolver: 'webpack',
	// 	use: [require('nib')(), require('jeet')(), require('rupture')()],
	// 	import: [
	// 		'~nib/lib/nib/index.styl', 
	// 		'~jeet/styl/index.styl',
	// 		'~rupture/rupture/index.styl'
	// 	]
	// }
};
