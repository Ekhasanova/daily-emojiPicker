'use strict';

const path = require('path');
const UglifyJsWebpackPlugin = require( 'uglifyjs-webpack-plugin' );
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const extractLESS = new ExtractTextPlugin( 'picker.css');

module.exports = {

    entry: path.resolve( __dirname, 'src', 'ts', 'picker.ts' ),
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'picker.min.js',
        library: 'dailyEmojiPicker',
        libraryTarget:'umd'
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
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.less$/,
                use: extractLESS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: true,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('postcss-url')({
                                        sourceMap: true
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'resolve-url-loader'
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true,
                            }
                        }
                    ]
                })
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.png$/,
                loader: 'file-loader',
                options: {
                    name: "[name].[ext]",
                    outputPath: "img",
                }
            }
        ]
    },

    plugins: [ extractLESS ]

};
