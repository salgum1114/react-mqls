const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const del = require('del');
const pkg = require('./package.json');

del.sync(['dist/**', 'lib/**']);
console.log('Deleted dist, lib folders');

const plugins = [
    // 로더들에게 옵션을 넣어주는 플러그인
    new webpack.LoaderOptionsPlugin({
        minimize: true,
    }),
];
module.exports = {
    mode: 'production',
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
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js', 'jsx'],
    },
    entry: {
        [pkg.name]: path.resolve(__dirname, 'src/components/index.tsx'),
        [`${pkg.name}.min`]: path.resolve(__dirname, 'src/components/index.tsx'),
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
