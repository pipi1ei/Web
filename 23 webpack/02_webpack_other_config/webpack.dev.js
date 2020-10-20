const { smart } = require('webpack-merge')
const base = require('./webpack.config.js')

module.exports = smart(base, {
  mode: 'development'
})