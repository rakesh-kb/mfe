const { merge } = require('webpack-merge');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('./../package.json');

const prodConfig = {
    mode: 'development',
    output: {
        filename: '[name].[contenthash].js'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './Marketing': './src/bootstrap'
            },
            shared: packageJson.dependencies,
        }),
    ]
}

module.exports = merge(commonConfig, prodConfig);