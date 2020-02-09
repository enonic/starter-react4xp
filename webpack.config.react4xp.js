const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(env, config) {

    // This makes 'npm link' symlinks in node_modules work:
    config.resolve.symlinks = false;

    config.module.rules = [
        ...(config.module.rules || []),
        ...[
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
                exclude: /\.global\.css$/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
                include: /\.global\.css$/
            },
            {
                test: /\.(svg|png|gif|jpe?g)$/,
                use: 'file-loader'
            }
        ]
    ];

    config.plugins = [
        ...(config.plugins || []),
        new MiniCssExtractPlugin( {
            filename: '[name].[contenthash:7].css',
            chunkFilename: '[id].[contenthash:7].css',
        })
    ];

    return config;
};
