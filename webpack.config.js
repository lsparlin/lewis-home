require('babel-polyfill')
var webpack = require('webpack')
var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var BUILD_DIR = path.resolve(__dirname, 'public')
var JS_DIR = path.resolve(__dirname, 'src/js')

module.exports = {
    entry: ['babel-polyfill', JS_DIR + '/index.jsx'],
    output: {
        path: BUILD_DIR,
        filename: 'resources/js/bundle.js'
    },
    resolve: {
      alias: {
        'config': path.resolve(__dirname, 'app.config.js')
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'ENV.url': JSON.stringify(process.env.URL),
        'ENV.prismicApi': JSON.stringify(process.env.PRISMIC_API),
        'ENV.prismicOmitTags': JSON.stringify(process.env.PRISMIC_OMIT_TAGS)
      }),
      new webpack.ProvidePlugin({
        'ENV.config': 'config'
      }),
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
