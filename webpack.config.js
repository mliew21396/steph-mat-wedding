var path = require('path');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
var ImageminMozjpeg = require('imagemin-mozjpeg');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

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
            // resourceQuery: /inline/, // foo.css?inline
            loader: 'responsive-loader',
            options: {
              name: 'img/responsive/[name]-[width].[ext]',
              sizes: [300, 600, 1200, 2000],
              // sizes: [100, 2000],
              adapter: require('responsive-loader/sharp')
            }
          },
        ],
      },
      // {
      //   test: /\.(png|jpg)$/i,
      //   resourceQuery: /responsive/,
      //   loader: 'responsive-loader',
      //   options: {
      //     name: 'img/responsive/[name]-[width].[ext]',
      //     sizes: [100, 300, 600, 1200, 2000],
      //     adapter: require('responsive-loader/sharp'),
      //   }
      // },
      // {
      //   test: /Steph_Mat_Engagement_66\.jpg$/,
      //   use: [
      //     'file-loader',
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         mozjpeg: {
      //           progressive: true,
      //           quality: 65
      //         },
      //         name: '[name].[ext]'
      //       }  
      //     }
      //   ]
      // },
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
              // publicPath: 'img/'
            }
          },
        ],
      },
      // {test: /Steph_Mat_Engagement_66\.(jpeg)$/i, loader: "file-loader?name=/public/icons/[name].[ext]"},
      // {
      //   test: /Steph_Mat_Engagement_66\.(jpg)$/,
      //   loader: 'url-loader'
      // },
      // {
      //   test: /Steph_Mat_Engagement_66\.jpg$/,
      //   use: [
      //     'file-loader',
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         mozjpeg: {
      //           progressive: true,
      //           quality: 65
      //         },
      //         name: '[name].[ext]'
      //       }  
      //     }
      //   ]
      // },
      // loader: "file-loader?name=img/img-[hash:6].[ext]"
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
        exclude: /node_modules/,
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
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: ['css-loader', 'sass-loader']
        // })
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.handlebars$/,
        loader: "handlebars-loader",
        query: {
          runtime: 'handlebars/dist/handlebars.runtime.js',
        }
      }
      // { test: /\.handlebars$/, loader: __dirname + "/../../" }
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
      // test: /\.(png|jpg|gif)$/
      // jpegtran: {
      //   quality: '95-100'
      // }
      // plugins: [
      //   imageminMozjpeg({
      //     quality: 100,
      //     progressive: true
      //   })
      // ]
      // disable: process.env.NODE_ENV !== 'production', // Disable during development
      // pngquant: {
      //   quality: '95-100'
      // }
    }),
    new ExtractTextPlugin('style.css'),
    new HardSourceWebpackPlugin()
  ]
};