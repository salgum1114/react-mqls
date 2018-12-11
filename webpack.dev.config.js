const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devPort = 8080;
const host = 'localhost';

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                include: path.resolve(__dirname, 'examples'),
                options: {
                    presets: [
                        '@babel/env',
                        '@babel/preset-react',
                    ],
                    plugins: [
                        '@babel/plugin-transform-runtime',
                        '@babel/plugin-syntax-dynamic-import',
                        ['@babel/plugin-proposal-decorators', { legacy: true }],
                        '@babel/plugin-syntax-async-generators',
                        ['@babel/plugin-proposal-class-properties', { loose: false }],
                        '@babel/plugin-proposal-object-rest-spread',
                        'react-hot-loader/babel',
                        'dynamic-import-webpack',
                    ],
                },
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true,
                },
            },
        },
        noEmitOnErrors: true,
    },
    resolve: {
        alias: {
            'ag-grid-root': path.resolve(__dirname, '/node_modules/ag-grid'),
        },
    },
    entry: {
        bundle: [
            '@babel/polyfill',
            `webpack-dev-server/client?http://${host}:${devPort}`,
            'webpack/hot/only-dev-server',
            path.resolve(__dirname, 'examples/index.js'),
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[hash:16].js',
        chunkFilename: '[id].[hash:16].js',
    },
    devServer: {
        inline: true,
        port: devPort,
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        publicPath: '/',
        historyApiFallback: true,
        host,
        proxy: {
            '/api': {
                target: 'http://localhost',
            },
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // HMR을 사용하기 위한 플러그인
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${__dirname}/examples/index.html`,
        }),
    ],
};
