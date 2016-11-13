const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootPath = require('app-root-path');

const mainDir = rootPath + '/src';

module.exports = {

	entry: {
		polyfills: `${mainDir}/polyfills.ts`,
		main: `${mainDir}/main.ts`
	},

	devtool: 'source-map',

	output: {
		path: rootPath + '/dist',
		filename: '[name].bundle.js',
		sourceMapFilename: '[name].map',
		chunkFilename: '[id].chunk.js'
	},

	resolve: {
		extensions: ['', '.ts', '.js'],
		root: mainDir,
		modulesDirectories: ['node_modules'],
	},

	module: {
		preLoaders: [],
		loaders: [
			{
				test: /\.ts$/,
				loader: 'ts',
				exclude: [/\.(spec|e2e)\.ts$/]
			},
			{
				test: /\.json$/,
				loader: 'json'
			}
		]
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['main', 'polyfills']
		}),
		new HtmlWebpackPlugin({
			template: mainDir + '/index.html',
			chunksSortMode: 'dependency'
		})
	]
};