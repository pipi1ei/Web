const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir: 'static',
  configureWebpack: {
    resolve: {
      // 路径别名
      alias: {
        'components': '@/components',
        'views': '@/views',
        'assets': '@/assets',
        'network': '@/network',
        'utils': '@/utils'
      }
    },
  },
  chainWebpack(config){
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}