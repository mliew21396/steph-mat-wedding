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
      },
      {
        test: /\.(gif)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: false,
              }
            }
          },
        ],
      },
      // {
      //    test:/\.(s*)css$/,
      //    loaders:['style-loader','css-loader?url=false', 'sass-loader?sourceMap']
      // }
      // {
      //   test: /\.css/
      //   use: ExtractTextPlugin.extract({
      //         use: 'css-loader',
      //         fallback: 'style-loader'
      //   })
      // }
      {
        test: /\.(s*)css$/,
        include: [
          path.resolve(__dirname, "./src/styles")
        ],
        use: ExtractTextPlugin.extract({
          publicPath: '../../',
          use: [
            {
              loader: 'css-loader'
            }, {
              loader: 'sass-loader'
            }
          ]
        })
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: ['css-loader', 'sass-loader']
        // })
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000'
      },



      { test: /\.handlebars$/, loader: "handlebars-loader" }
      // { test: /\.handlebars$/, loader: __dirname + "/../../" }



      // {
      //     test: /\.scss$/,
      //     use: [{
      //         loader: "style-loader" // creates style nodes from JS strings
      //     }, {
      //         loader: "css-loader" // translates CSS into CommonJS
      //     }, {
      //         loader: "sass-loader" // compiles Sass to CSS
      //     }]
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