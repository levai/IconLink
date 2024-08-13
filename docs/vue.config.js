const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
    publicPath: './',
    outputDir: '../docs-dist',
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            },
        }
    }
})
