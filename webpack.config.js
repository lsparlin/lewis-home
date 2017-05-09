/* webpack.config.js */
module.exports = {
    entry: './src/js/main.js',
    output: {
        path: __dirname + '/resources/js',
        filename: 'bundle.js',
        publicPath: '/resources/js'
    },
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
