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
                test: /\.(js|jsx|tsx|ts)$/,
                loader: 'babel-loader?cacheDirectory',
                include: path.resolve(__dirname, 'src'),
                options: {
                    presets: [
                        ['@babel/preset-env', { modules: false }],
                        '@babel/preset-react',
                        '@babel/preset-typescript',
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
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
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
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js', 'jsx'],
    },
    entry: {
        bundle: [
            '@babel/polyfill',
            `webpack-dev-server/client?http://${host}:${devPort}`,
            'webpack/hot/only-dev-server',
            path.resolve(__dirname, 'src/index.tsx'),
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
        }),
    ],
};
