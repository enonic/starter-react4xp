//──────────────────────────────────────────────────────────────────────────────
// Use this file to adjust the webpack config.
//──────────────────────────────────────────────────────────────────────────────
// A template version of this, with upated properties and explanations,
//  can always be found in the react4xp NPM package:
//   node_modules/react4xp/examples/webpack.config.react4xp.js after installing,
//  or:
//   https://github.com/enonic/enonic-react4xp/blob/master/examples/webpack.config.react4xp.js
//──────────────────────────────────────────────────────────────────────────────

module.exports = function(env, config) {

    // This makes 'npm link' symlinks in node_modules work:
    config.resolve.symlinks = true;

    return config;
};
