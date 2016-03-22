var HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
      	title: 'My App',
      	filename: '../index.html',
	template: 'views/index.html'
    })

const PATHS = {
  entry: path.join(__dirname, './code/main.ts'),
  build: path.join(__dirname, './wwwroot/app/build')
};


module.exports = {
	resolve: {
    	extensions: ['', '.js', '.ts', '.tsx']
  	},
	entry: './code/main.ts',
	output: {
		filename: 'bundle.js',
		path: './wwwroot/app/build'
	},
	externals: {
    	"react": "React",
        "react-dom": "ReactDOM"
	},
  	module: {
    	loaders: [{
      		test: /\.tsx?$/,
      		loader: 'ts-loader',
      		exclude: /node_modules/
   		}]
  	},
	devtool: 'source-map',
	plugins: []
}