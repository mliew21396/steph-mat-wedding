var path = require('path');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
var ImageminMozjpeg = require('imagemin-mozjpeg');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "eslint-loader",
          loader: "babel-loader"
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
              sizes: [300, 600, 1200],
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
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
        ]
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
  optimization:{
      splitChunks:{
          cacheGroups:{
              vendor: {
                  chunks: 'initial',
                  test: path.resolve(__dirname, 'node_modules'),
                  name: 'vendors',
                  enforce: true,
              }
          }, 
      }
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
    new MiniCssExtractPlugin({
      filename: "[name].css",
    })
  ]
};