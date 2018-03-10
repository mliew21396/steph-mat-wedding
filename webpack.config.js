var path = require('path');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
var ImageminMozjpeg = require('imagemin-mozjpeg');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/, // Run the loader on all .js files
      //   exclude: /node_modules/, // ignore all files in the node_modules folder
      //   use: 'jshint-loader'
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
        }
      },
      {
        test: /\.(png|jpg)$/i,
          oneOf: [
          {
            resourceQuery: /normal/,
            use: [
              'file-loader?name=img/[name].[ext]&publicPath=./',
              {
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    progressive: true
                  }
                }
              }
            ]
          },
          {
            loader: 'responsive-loader',
            options: {
              name: 'img/responsive/[name]-[width].[ext]',
              sizes: [300, 600, 1200, 2000],
              adapter: require('responsive-loader/sharp')
            }
          },
        ],
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
              },
              name: 'img/[name].[ext]'
            }
          },
        ],
      },
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          publicPath: '../../',
          use: [
            {
              loader: 'css-loader',
              options: {
                  minimize: true
              }
            }, {
              loader: 'sass-loader',
              options: {
                  minimize: true
              }
            }
          ]
        })
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              publicPath: './',
              limit: 8192,
              name: "./fonts/[hash].[ext]",
            }
          }
        ]
      },
      {
        test: /\.handlebars$/,
        loader: "handlebars-loader",
        query: {
          runtime: 'handlebars/dist/handlebars.runtime.js',
        }
      }
    ]
  },
  plugins: [
    // Make sure that the plugin is after any plugins that add images
    new ImageminPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 100,
          progressive: true
        })
      ]
    }),
    new ExtractTextPlugin('style.css'),
    new HardSourceWebpackPlugin()
  ]
};