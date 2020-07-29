/** Use this file to adjust the webpack config.
 *  Uncomment the overrideComponentWebpack property in react4xp.properties, and add this file there.
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(env, config) {

    // Makes symlinks under node_modules work, e.g. 'npm link' and possibly PNPM etc:
    config.resolve.symlinks = true;

    // Compile .scss and friends:
    config.module.rules = [
        ...(config.module.rules || []),
        {
            test: /\.((sa|sc|c))ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: { auto: true },
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            outputStyle: 'compressed',
                        },
                    },
                }
            ]
        }
    ];

    // Set up how the compiled assets are exported:
    config.plugins = [
        ...(config.plugins || []),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].[contenthash:9].css',
        }),
    ];

    return config;
};
