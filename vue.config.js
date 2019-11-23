const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    port: 3087
  },

  configureWebpack: {},

  chainWebpack: config => {
    config.resolve.alias.set('@$', resolve('src'))
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}
