var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var BUILD_DIR = path.resolve(__dirname, 'public')
var APP_DIR = path.resolve(__dirname, 'src/js')

module.exports = {
    entry: APP_DIR + '/app.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'resources/js/bundle.js',
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'src/html' },
        { from: 'bower_components' }
      ])
    ],
 		module: {
       loaders: [
        { 
           test: /\.jsx?$/, 
           include: APP_DIR,
           exclude: /(node_modules|bower_components)/, 
           loader: 'babel-loader' 
        },
   	    {
           test: /\.less/,
           loaders: ['style-loader', 'css-loader', 'less-loader']
        }
       ]
   }
}
