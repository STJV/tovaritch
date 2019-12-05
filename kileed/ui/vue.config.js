const BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  'lintOnSave': false,
  'productionSourceMap': false,

  'transpileDependencies': [
    'vuetify'
  ],
  configureWebpack: {
    devtool: '#inline-cheap-module-source-map',
    output: {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    }
  },
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
