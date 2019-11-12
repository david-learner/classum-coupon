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
        ],
    },
    plugins: [
        
    ],
    resolve: {
        extensions: [".ts", ".js"]
    }
}