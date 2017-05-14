var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var BUILD_DIR = path.resolve(__dirname, 'public')
var JS_DIR = path.resolve(__dirname, 'src/js')

module.exports = {
    entry: JS_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'resources/js/bundle.js'
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'src/html' },
        { from: 'src/resources' }
      ])
    ],
     module: { loaders: [
        { 
           test: /\.jsx?$/, 
           include: JS_DIR,
           exclude: /(node_modules|bower_components)/, 
           loader: 'babel-loader' 
        },
        {
          test: /\.scss/,
          loaders: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.css/,
          loaders: ['style-loader', 'css-loader']
        }

       ]
   }
}
