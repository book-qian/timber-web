/*
 * @Author: yangyongqian
 * @Date: 2023-07-23 15:51:33
 * @Description:项目配置文件
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir: 'timber-web',
  assetsDir: 'static',
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // 本地反向代理配置
  devServer: {
    proxy: {
      '/webapi': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    },
    client: {
      overlay: false
    }
  }
})
