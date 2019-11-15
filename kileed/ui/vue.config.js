const BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    watchOptions: {
      poll: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  publicPath: 'http://localhost:8080/',
  outputDir: './dist/',

  chainWebpack: config => {
    config
      .plugin('BundleTracker')
      .use(BundleTracker, [{ filename: './webpack-stats.json' }])

    config.resolve.alias
      .set('__STATIC__', 'static')

    config.devServer
      .host('0.0.0.0')
      .port(8080)
      .hotOnly(true)
      .watchOptions({ poll: 1000 })
      .https(false)
  }
}
