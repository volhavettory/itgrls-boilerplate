const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    mode: 'development',
    devtool: 'inline-source-map',
    target: "web",
    devServer: {
        /** Будет запускать сервер на localhost:8080 в этой папке*/
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/',
        open: true,
        watchContentBase: true,
        port: 8080,
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            /** Babel **/
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            /** HTML */
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            /** CSS */
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            /** Картинки */
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            /** Шрифты */
            {
                test: /\.(woff(2)?|eot|ttf|otf|)$/,
                type: 'asset/inline',
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'), // шаблон
            filename: 'index.html', // название выходного файла
            inject: true,
            chunks: "all",
            chunksSortMode: 'none' //fixes bug
        }),
        new CleanWebpackPlugin({cleanStaleWebpackAssets:true}),
    ],
};
