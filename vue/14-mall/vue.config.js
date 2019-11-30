module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'views': '@/views',
        'assets': '@/assets',
        'network': '@/network',
        'common': 'common'
      }
    }
  }
}