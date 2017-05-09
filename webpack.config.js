var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: __dirname + '/public',
        filename: 'resources/js/bundle.js',
        publicPath: '/public'
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
