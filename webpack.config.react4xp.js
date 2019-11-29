module.exports = function(env, config) {
    console.log("\n\n--- Raw -- \n\n" + JSON.stringify(config, null, 4) + "\n--- /Raw ---");

    // This makes 'npm link' symlinks in node_modules work:
    config.resolve.symlinks = false;

    return config;
};
