const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: './js/index.js',
	output: {
		filename: 'js/bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src/js'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(sa|sc|c)ss$/i,
				use: [
					{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								autoprefixer()
							],
							sourceMap: true
						}
					},
					'sass-loader',
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'images'
				}
			},
			{
				test: /\.(ttf|woff|woff2|eot|otf)$/i,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'fonts'
				}
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/style.min.css'
		}),
		new HtmlWebpackPlugin({
			template: 'index.html'
		}),
		new CleanWebpackPlugin(),
	]
}