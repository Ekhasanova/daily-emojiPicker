'use strict';

const webpack = require('webpack');
const path = require('path');
const UglifyJsWebpackPlugin = require( 'uglifyjs-webpack-plugin' );


module.exports = {

    entry: path.resolve( __dirname, 'src', 'ts', 'picker.ts' ),
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'picker.js'
    },

    optimization: {
        minimizer: [
            new UglifyJsWebpackPlugin( {
                sourceMap: true,
                uglifyOptions: {
                    output: {
                        comments: /^!/
                    }
                }
            } )
        ]
    },

    module: {
        rules: [
            {
                test: /\.png$/,
                use: ['raw-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ],
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    }

};
