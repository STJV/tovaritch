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
  entry: {
    core: './tovaritch/core/frontend/core.js'
  },
  module: {
    rules: [
       {
        test: /\.vue$/,
        include: resolve(__dirname, 'tovaritch'),
        use: [ 'cache-loader', 'vue-loader' ]
      }, {
        test: /\.css$/, use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },{
        test: /\.s(c|a)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    minimize: _switch(args, false, true),
    minimizer: _switch([], [
      new TerserJSPlugin(),
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
  devtool: _switch(args, 'source-map'),
  resolve: {
    enforceExtension: false,
    alias: {
      '@': resolve(__dirname, 'tovaritch', 'core', 'frontend')
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
  stats: 'minimal',
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
    }),
    new BundleTracker({
      path: __dirname,
      filename: '.build/webpack-stats.json'
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
      reportFilename: resolve(__dirname, '.build', 'stats.html')
    })
  ]
});