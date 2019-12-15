const BundleTracker = require('webpack-bundle-tracker')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const fibers = require('fibers')
const sass = require('sass')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve } = require('path')

module.exports = (env, {mode}) => {
  let devMode = (mode === 'development')
  return {
    entry: {
      core: './tovaritch/core-ui/index.js'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          include: resolve(__dirname, 'tovaritch'),
          use: [ 'cache-loader', 'vue-loader' ]
        }, {
          test: /\.css$/, use: [
            ...(devMode ?
              ['style-loader', 'cache-loader'] :
              [MiniCssExtractPlugin.loader]),
            {
              loader: 'css-loader',
              options: {
                sourceMap: false
              }
            }
          ]
        }, {
          test: /\.sass$/,
          use: [
            ...(devMode ?
              ['vue-style-loader', 'cache-loader'] :
              [MiniCssExtractPlugin.loader]),
            {
              loader: 'css-loader',
            }, {
              loader: 'sass-loader',
              options: {
                implementation: sass,
                sassOptions: {
                  fiber: fibers,
                  indentedSyntax: true,
                },
                prependData: `@import "tovaritch/core-ui/styles/main.sass"`,
              },
            },
          ]
        }, {
          test: /\.(png|svg|jpg|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
            }
          }]
        }, {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        }
      ]
    },
    optimization: {
      minimize: !devMode,
      minimizer: (devMode ? [] : [
        new TerserJSPlugin({
          cache: true,
          extractComments: false
        }),
        new OptimizeCSSAssetsPlugin({})
      ]),
    },
    output: {
      publicPath: '/static/',
      filename: 'js/[name].[hash].js',
      sourceMapFilename: '[file].js.map',
      path: resolve(__dirname, '.build', 'dist'),
      devtoolModuleFilenameTemplate(info) {
        if (info.resourcePath.match(/.vue$/) && info.allLoaders !== '' ) {
          return `webpack-internal:///${info.resourcePath}?${info.hash}`
        } 
        return `webpack:///${info.resourcePath}`
      }
    },
    devtool: devMode ? 'source-map' : undefined,
    resolve: {
      enforceExtension: false,
      modules: [
        'node_modules',
        resolve(__dirname, 'node_modules'),
        resolve(__dirname, '')
      ],
      extensions: [
        '.js',
        '.vue',
      ]
    },
    performance: {
      maxEntrypointSize: 1000000,
      maxAssetSize: 500000
    },
    devServer: {
      contentBase: resolve(__dirname, 'dist'),
      publicPath: '/static/',
      index: '',
      proxy: {
        target: 'http://localhost:8000',
        context: ['**', '!/static/**'],
      },
      hot: true
    },
    plugins:
    [
      new CleanWebpackPlugin(),
      new VueLoaderPlugin(),
      new VuetifyLoaderPlugin(),
      new BundleTracker({
        path: __dirname,
        filename: '.build/webpack-stats.json'
      }),
      ...(devMode ? [] :
        [
          new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
          })
        ]
      )
    ]
  }
};
