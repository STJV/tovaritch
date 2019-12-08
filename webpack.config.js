const BundleTracker = require('webpack-bundle-tracker')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const fibers = require('fibers')
const path = require('path')
const sass = require('sass')

module.exports = {
  entry: './kileed/core/ui/main.js',
  module: {
    rules: [
      { test: /\.js$/,
        include: path.resolve(__dirname, 'kileed'),
        use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: 'node_modules/.cache/babel-loader'
          }
        }]
      },
      {
        test: /\.vue$/,
        include: path.resolve(__dirname, 'kileed'),
        use: [
        {
          loader: 'cache-loader',
          options: {
            cacheDirectory: 'node_modules/.cache/vue-loader',
            cacheIdentifier: '78d004d1'
          }
        }, {
          loader: 'vue-loader',
          options: {
            cacheDirectory: 'node_modules/.cache/vue-loader'
          }
        }]
      },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
      { test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sassOptions: { fiber: fibers }
            },
          },
        ]
      },
      { test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
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
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    /*
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        cache: true
      })
    ],
    */
  },
  output: {
    publicPath: '/static/',
    filename: 'js/[name].[chunkhash].js',
    sourceMapFilename: 'js/[name].[chunkhash].js.map',
    path: path.resolve('./build/dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new BundleTracker({
      path: __dirname,
      filename: './build/webpack-stats.json'
    })
  ],
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    enforceExtension: false,
    alias: {
      '@': path.resolve(__dirname, 'kileed/core/ui')
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/static/',
    index: '',
    proxy: {
      target: 'http://localhost:8000',
      context: ['**', '!/static/**'],
    }

  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'node_modules')
    ]
  },
};