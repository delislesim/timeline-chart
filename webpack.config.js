const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['./src/index.ts'],
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, 'example'),
        disableHostCheck: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'lib')
    }
};