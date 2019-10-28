const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	entry: {
		"main": "./src/index.js"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: 'CascadeTree', // 指定的就是你使用require时的模块名
    libraryTarget: 'umd', // 指定输出格式
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
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
		new VueLoaderPlugin()
	]
};