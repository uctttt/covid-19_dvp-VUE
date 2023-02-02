const { defineConfig } = require('@vue/cli-service');
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        host: 'localhost',
        port: '8080',
        proxy: {
            '/news': { //设置代理，检测以/news开头的链接
                target: 'https://interface.sina.cn',
                secure: false,
                ws: true, //代理websockets
                changeOrigin: true, //设置跨域
            },
        }
    },
    configureWebpack: {
        plugins: [
            ComponentsPlugin({
                resolvers: [VantResolver()],
            }),
        ],
    },

})