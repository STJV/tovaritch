const BundleTracker = require('webpack-bundle-tracker')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const fibers = require('fibers')
const sass = require('sass')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve } = require('path')

function _switch (args, developmentValue, productionValue) {
  if(args.mode === 'production') {
    return productionValue
  }

  return developmentValue
}

module.exports = (env, args) => ({
  entry: './kileed/core/ui/main.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: resolve(__dirname, 'kileed'),
        use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: 'node_modules/.cache/babel-loader'
          }
        }]
      }, {
        test: /\.vue$/,
        include: resolve(__dirname, 'kileed'),
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
      }, {
        test: /\.css$/, use: [
          _switch('vue-style-loader', MiniCssExtractPlugin.loader),
          'css-loader',
        ]
      },{
        test: /\.s(c|a)ss$/,
        use: [
          _switch('vue-style-loader', MiniCssExtractPlugin.loader),
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sassOptions: { fiber: fibers }
            },
          },
        ]
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
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        }
      }
    },
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  output: {
    publicPath: '/static/',
    filename: 'js/[name].[hash].js',
    sourceMapFilename: 'js/[name].[hash].js.map',
    path: resolve(__dirname, 'build', 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
    }),
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new BundleTracker({
      path: __dirname,
      filename: './build/webpack-stats.json'
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      defaultSizes: 'gzip',
      analyzerMode: 'static',
      reportFilename: resolve(__dirname, 'build', 'stats.html')
    })
  ],
  devtool: _switch('cheap-module-eval-source-map'),
  resolve: {
    enforceExtension: false,
    alias: {
      '@': resolve(__dirname, 'kileed', 'core', 'ui')
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
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/static/',
    index: '',
    proxy: {
      target: 'http://localhost:8000',
      context: ['**', '!/static/**'],
    },
    hot: true
  },
  resolveLoader: {
    modules: [
      'node_modules',
      resolve(__dirname, 'node_modules')
    ]
  },
  stats: 'minimal'
});