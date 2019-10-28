const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	entry: {
		"main": "./src/main.js"
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name].js"
	},
	devServer: {
		historyApiFallback: true,
		overlay: true
	},
	resolve: {
    extensions: ['.js', '.vue'],
    alias: {
			'vue$': 'vue/dist/vue.esm.js',
      'src': path.resolve(__dirname, './src'),
      'assets': path.resolve(__dirname, './src/assets'),
      'components': path.resolve(__dirname, './src/components')
    }
	},
	module: {
		rules: [
			{
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
				test: /\.css$/,
				loader: "style-loader!css-loader"
			},
			{
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
			inject: 'body'
		}),
		new VueLoaderPlugin()
	]
};