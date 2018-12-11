const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pkg = require('./package.json');

const pathsToClean = [
    '',
];
const cleanOptions = {
    root: path.resolve(__dirname, 'dist'),
    verbose: true,
};
const isClean = process.argv.length > 5;
const plugins = [
    // 로더들에게 옵션을 넣어주는 플러그인
    new webpack.LoaderOptionsPlugin({
        minimize: true,
    }),
];
if (isClean) {
    // Build시 chunk 파일 삭제
    plugins.push(new CleanWebpackPlugin(pathsToClean, cleanOptions));
}
module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                include: path.resolve(__dirname, 'src'),
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
        noEmitOnErrors: true,
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                include: /\.min\.js$/,
                cache: true,
                parallel: true,
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        warnings: false,
                        unused: true, // tree shaking(export된 모듈 중 사용하지 않는 모듈은 포함하지않음)
                    },
                    ecma: 6,
                    mangle: true,
                    unused: true,
                },
                sourceMap: true,
            }),
        ],
    },
    entry: {
        [pkg.name]: path.resolve(__dirname, 'src/index.js'),
        [`${pkg.name}.min`]: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].js',
        library: `${pkg.name}.js`,
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    externals: {
        react: 'react',
    },
    plugins,
};
