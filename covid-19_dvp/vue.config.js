const { defineConfig } = require('@vue/cli-service');
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            //设置代理，检测链接开头
            '/api': {
                target: 'https://eolink.o.apispace.com', //接口域名
                secure: true, //是否https接口
                ws: true, //代理websockets
                changeOrigin: true, //设置跨域
                pathRewrite: { //路径重置
                    '^/api': ''
                }
            },

            '/news': {
                target: 'https://interface.sina.cn',
                secure: true,
                ws: true,
                changeOrigin: true,
            },

        },
    },

    configureWebpack: {
        plugins: [
            ComponentsPlugin({
                resolvers: [VantResolver()],
            }),
        ],
    },

})