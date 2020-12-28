const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);

const CracoLessPlugin = require('craco-less');

module.exports = {
  // 修改主题相关配置
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {'@primary-color': '#1DA57A'},
            javascriptEnabled: true,
          }
        }
      }
    }
  ],

  webpack: {
    alias: {
      '@': resolve('src'),
      'components': resolve('src/components'),
    }
  } 
}