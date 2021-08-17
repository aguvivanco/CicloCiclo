const path= require("path");
const HtmlWebpackPlugin =require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin= require("css-minimizer-webpack-plugin");
const TerserPlugin= require("terser-webpack-plugin");
module.exports ={
	entry:"./src/index.js",
	output: {
		path: path.resolve(__dirname,"dist"),
		filename: "[name].[contenthash].js",
		// Ojo con la linea de arriba sino volver a main.js
	},
	mode: "development",
	resolve :{
		extensions:[".js"],
		alias: {
			"@utils": path.resolve(__dirname,"src/utils/"),
			"@styles": path.resolve(__dirname,"src/styles/")
		}
	},
	module: {
		rules: [
		{
			test: /\.m?js$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader"
			}
		},
		{
			test: /\.css$/i,
			use: [MiniCssExtractPlugin.loader,"css-loader"],
		}
	]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template:"./public/index.html",
			filename: "./index.html",
		}),
		new MiniCssExtractPlugin({ 
			filename: "assets/[name].[contenthash].css",
			}),

	],
	devServer:{
		contentBase: path.join(__dirname,"dist"),
		compress: true,
		historyApiFallback: true,
		port:3006,
	}
}