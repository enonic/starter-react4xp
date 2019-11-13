module.exports = function(env, config) {
    console.log(JSON.stringify(config, null, 4));

    // This makes 'npm link' symlinks in node_modules work:
    config.resolve.symlinks = false;

    return config;
};
