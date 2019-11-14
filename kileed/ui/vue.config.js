module.exports = {
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    watchOptions: {
      poll: true
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}
