const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(env, config) {
    // This makes 'npm link' symlinks in node_modules work:
    config.resolve.symlinks = false;

    config.module.rules = [
        ...config.module.rules,
        ...[
            {
                test: /\.css$/,
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
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader'
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
        ...config.plugins,
        new MiniCssExtractPlugin( {
            filename: '[name].[contenthash:7].css',
            chunkFilename: '[name].[contenthash:7].css',
        })
    ];

    return config;
};
