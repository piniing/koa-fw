'use strict';

/**
 * Created by x.Laoxu on 1/5/16.
 */
var webpack     = require('webpack');
var path        = require('path');
var fs          = require('fs');
var packageJson = require('./package.json');

var nodeModules = {};
if (fs.existsSync('node_modules')) {
    fs.readdirSync('node_modules')
        .filter(function (x) {
            return ['.bin'].indexOf(x) === -1;
        })
        .forEach(function (mod) {
            nodeModules[mod] = 'commonjs ' + mod;
        });
}

// nodeModules['koa'] = 'commonjs koa';

module.exports = {
    entry: {
        app: [
            'babel-regenerator-runtime', 
            path.resolve(__dirname, 'src/app.js')
        ]
    },
    target: 'node',
    devtool: 'cheap',
    output: {
        path: path.join(__dirname, 'build'),
        filename: `app_${packageJson.version}.js`
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            loaders: ['babel'], //['react-hot', 'babel'], // 加载模块 'babel' 是 'babel-loader' 的缩写
            include: path.join(__dirname, 'src'),
            exclude: /node_modules/
        }]
    },
    externals: nodeModules,
    plugins: [
        // new webpack.DefinePlugin({
        //     $dirname: '__dirname',
        // }),
        new webpack.IgnorePlugin(/\.(css|less)$/)
    ],
    node: {
        __filename: false,
        __dirname: false
    }
}