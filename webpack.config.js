var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: ['./src/public/js/coupon.ts'],
    output: {
        filename: 'coupon.js',
        path: path.resolve(__dirname, 'dist/public/js')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            },
            // { test: /\.handlebars$/, loader: "handlebars-loader" }
        ],
    },
    plugins: [
        // new webpack.LoaderOptionsPlugin({
        //     options: {
        //         handlebarsLoader: {}
        //     }
        // }),
        // new HtmlWebpackPlugin({
        //     title: 'My awesome service',
        //     template: './views/layouts/main.handlebars'
        // })
    ],
    resolve: {
        extensions: [".ts", ".js"]
    }
}