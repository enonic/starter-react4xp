/** Use this file to adjust the webpack config.
 *  Uncomment the overrideComponentWebpack property in react4xp.properties, and add this file there.
 */


module.exports = function(env, config) {
    //console.debug('Inside the OVERRIDE_COMPONENT_WEBPACK file', env, config);

    // Makes symlinks under node_modules work, e.g. 'npm link' and possibly PNPM etc:
    config.resolve.symlinks = true;

    return config;
};
