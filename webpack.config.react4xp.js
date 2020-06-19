const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(env, config) {
    // This makes 'npm link' symlinks in node_modules work:
    config.resolve.symlinks = true;

    // Adding support for styling
    config.module.rules = [
        ...(config.module.rules || []),
        {
            test: /\.((sa|sc|c))ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                // 'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        // Run `postcss-loader` on each CSS `@import`, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
                        // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
                        importLoaders: 1,
                        // Automatically enable css modules for files satisfying `/\.module\.\w+$/i` RegExp.
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

    config.plugins = [
        ...(config.plugins || []),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].[contenthash:9].css',
        }),
    ];

    return config;
};
