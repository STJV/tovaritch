const BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  'lintOnSave': false,
  'productionSourceMap': false,

  'transpileDependencies': [
    'vuetify'
  ],
  chainWebpack: config => {
    config
      .plugin('BundleTracker')
      .use(BundleTracker, [{ filename: './webpack-stats.json' }])

    config.resolve.alias
      .set('__STATIC__', 'static')
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
