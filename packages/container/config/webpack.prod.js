const { merge } = require('webpack-merge');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('./../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js', // for caching issues
        publicPath: '/container/latest/' // prepend all the scripts thats will be added to index.html with /container/latest/
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
                auth: `auth@${domain}/auth/remoteEntry.js`,
                dashboard: `dashboard@${domain}/dashboard/remoteEntry.js`,
            },
            shared: packageJson.dependencies
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);