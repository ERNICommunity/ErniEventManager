const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');
module.exports = {
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'src/index.ts'),
    target: 'node',
    node: {
        __dirname: false
    },
    externals: [nodeExternals({
        modulesDir: './node_modules'
    })],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'express.bundle.js',
        sourceMapFilename: 'express.bundle.map',
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: []
};