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

	// Comment in and customize the lines below to improve incremental builds in
	// development mode. (see https://webpack.js.org/configuration/cache/)
	//
	// if (process.env.NODE_ENV === 'development') {
	// 	config.cache = {
	// 		type: 'filesystem'
	// 	}
	// }

	// This makes 'npm link' symlinks in node_modules work:
	config.resolve.symlinks = true;

	config.experiments = {
		...config.experiments,
		css: true,
	};

	config.module.parser = {
		...config.module.parser,
		'css/auto': {
			...(config.module.parser && config.module.parser['css/auto']),
			namedExports: false,
		},
	};

	config.module.rules = [
		...(config.module.rules || []),
		{
			test: /\.css$/i,
			type: 'css/auto',
		},
		{
			test: /\.s[ac]ss$/i,
			type: 'css/auto',
			use: [
				{
					loader: 'sass-loader',
					options: {
						sassOptions: {
							outputStyle: 'compressed'
						}
					}
				}
			]
		},
		{
			test: /\.(woff|woff2|eot|ttf|otf)$/i,
			type: 'asset/resource', // ends up as auxiliaryAssets in stats.components.json
		},
	]

	return config;
};
