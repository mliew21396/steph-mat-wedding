var path = require('path');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Run the loader on all .js files
        exclude: /node_modules/, // ignore all files in the node_modules folder
        use: 'jshint-loader'
      },
      {
        test: /\.(jpe?g|png)$/i,
        loader: 'responsive-loader',
        options: {
          sizes: [100, 300, 600, 1200, 2000],
          adapter: require('responsive-loader/sharp')
        }
      }
      // {
      //    test:/\.(s*)css$/,
      //    loaders:['style-loader','css-loader', 'sass-loader']
      // },
      // {
      //   test: /\.css/
      //   use: ExtractTextPlugin.extract({
      //         use: 'css-loader',
      //         fallback: 'style-loader'
      //   })
      // }
      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: ['css-loader', 'sass-loader']
      //   })
      // }
    // ],
    // loaders: [
    //   {
    //     test: /\.css$/,
    //     use: [
    //       {
    //         loader: 'style-loader'
    //       }, {
    //         loader: 'css-loader'
    //       }
    //     ]
    //   }
    ]
  },
  plugins: [
    // Make sure that the plugin is after any plugins that add images
    new ImageminPlugin({
      // disable: process.env.NODE_ENV !== 'production', // Disable during development
      pngquant: {
        quality: '95-100'
      }
    }),
    new ExtractTextPlugin('style.css')
  ]
};