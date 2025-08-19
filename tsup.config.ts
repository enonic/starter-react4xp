// import { polyfillNode } from 'esbuild-plugin-polyfill-node';
import {globSync} from 'glob';
// import {print} from 'q-i';
import {defineConfig, type Options} from 'tsup';


interface MyOptions extends Options {
	d?: string
}


const RESOURCES_PATH = 'src/main/resources';
const ASSETS_PATH = `${RESOURCES_PATH}/assets`;
const CLIENT_GLOB_EXTENSIONS = '{tsx,ts,jsx,js}';
const SERVER_GLOB_EXTENSIONS = '{ts,js}';

const CLIENT_FILES = globSync(`${ASSETS_PATH}/**/*.${CLIENT_GLOB_EXTENSIONS}`);
// print(CLIENT_FILES, { maxItems: Infinity });

const SERVER_FILES = globSync(
	`${RESOURCES_PATH}/**/*.${SERVER_GLOB_EXTENSIONS}`,
	{
		absolute: false,
		ignore: globSync(`${ASSETS_PATH}/**/*.${SERVER_GLOB_EXTENSIONS}`)
			.concat(globSync(`${RESOURCES_PATH}/**/*.d.ts`))
	}
);
// print(SERVER_FILES, { maxItems: Infinity });

export default defineConfig((options: MyOptions) => {
	// print(options, { maxItems: Infinity });
	if (options.d === 'build/resources/main') {
		return {
			entry: SERVER_FILES.map(dir => dir.replace(/\\/g,'/')),
			// esbuildOptions(options) {
			// 	// 	options.alias = {
			// 	// 		"@enonic/react-components": "./node_modules/@enonic/react-components/dist/index.cjs",
			// 	// 	}

			// 	// Some node modules might need globalThis
			// 	// options.banner = {
			// 	// 	js: `const globalThis = (1, eval)('this');` // buffer polyfill needs this
			// 	// };
			// },
			esbuildPlugins: [
				// Some node modules might need parts of Node polyfilled:
				// polyfillNode({
				// 	globals: {
				// 		buffer: false,
				// 		process: false
				// 	},
				// 	polyfills: {
				// 		_stream_duplex: false,
				// 		_stream_passthrough: false,
				// 		_stream_readable: false,
				// 		_stream_transform: false,
				// 		_stream_writable: false,
				// 		assert: false,
				// 		'assert/strict': false,
				// 		async_hooks: false,
				// 		buffer: false,
				// 		child_process: false,
				// 		cluster: false,
				// 		console: false,
				// 		constants: false,
				// 		crypto: false,
				// 		dgram: false,
				// 		diagnostics_channel: false,
				// 		dns: false,
				// 		domain: false,
				// 		events: false,
				// 		fs: false,
				// 		'fs/promises': false,
				// 		http: false,
				// 		http2: false,
				// 		https: false,
				// 		module: false,
				// 		net: false,
				// 		os: false,
				// 		path: false,
				// 		perf_hooks: false,
				// 		process: false, //"empty",
				// 		punycode: false,
				// 		querystring: false,
				// 		readline: false,
				// 		repl: false,
				// 		stream: false,
				// 		string_decoder: false,
				// 		sys: false,
				// 		timers: false,
				// 		'timers/promises': false,
				// 		tls: false,
				// 		tty: false,
				// 		url: false,
				// 		util: false, // true,
				// 		v8: false,
				// 		vm: false,
				// 		wasi: false,
				// 		worker_threads: false,
				// 		zlib: false,
				// 	}
				// }) // ReferenceError: "navigator" is not defined
			],
			external: [
				// All these should be built to their own file and resolved at runtime, not bundled at compiletime:
				/^\/admin\//,
				/^\/error\//,
				/^\/headless\//,
				/^\/lib\//,
				/^\/react4xp\//,
				/^\/services\//,
				/^\/site\//,
				/^\/types\//,
				/^\/webapp\//,
				// These are not available at compiletime, so they must be external
				'/lib/enonic/react4xp',
				'/lib/guillotine',
				'/lib/thymeleaf',
				'/lib/xp/admin',
				'/lib/xp/app',
				'/lib/xp/auditlog',
				'/lib/xp/auth',
				'/lib/xp/cluster',
				'/lib/xp/common',
				'/lib/xp/content',
				'/lib/xp/context',
				'/lib/xp/event',
				'/lib/xp/export',
				'/lib/xp/grid',
				'/lib/xp/i18n',
				'/lib/xp/io',
				'/lib/xp/mail',
				'/lib/xp/node',
				'/lib/xp/portal',
				'/lib/xp/project',
				'/lib/xp/repo',
				'/lib/xp/scheduler',
				'/lib/xp/schema',
				'/lib/xp/task',
				'/lib/xp/value',
				'/lib/xp/vhost',
				'/lib/xp/websocket',
			],
			format: 'cjs',

			inject: [
				// 'node_modules/core-js/stable/string/raw.js',
				// 'node_modules/core-js/stable/object/entries.js',
			],

			// https://esbuild.github.io/api/#main-fields
			//
			// main: This is the standard field for all packages that are meant
			// to be used with node. The name main is hard-coded in to node's
			// module resolution logic itself. Because it's intended for use
			// with node, it's reasonable to expect that the file path in this
			// field is a CommonJS-style module.
			//
			// module: This field came from a proposal for how to integrate
			// ECMAScript modules into node. Because of this, it's reasonable to
			// expect that the file path in this field is an ECMAScript-style
			// module. This proposal wasn't adopted by node (node uses "type":
			// "module" instead) but it was adopted by major bundlers because
			// ECMAScript-style modules lead to better tree shaking, or dead
			// code removal.
			// For package authors: Some packages incorrectly use the module
			// field for browser-specific code, leaving node-specific code for
			// the main field. This is probably because node ignores the module
			// field and people typically only use bundlers for browser-specific
			// code. However, bundling node-specific code is valuable too (e.g.
			// it decreases download and boot time) and packages that put
			// browser-specific code in module prevent bundlers from being able
			// to do tree shaking effectively. If you are trying to publish
			// browser-specific code in a package, use the browser field instead
			//
			// browser: This field came from a proposal that allows bundlers to
			// replace node-specific files or modules with their
			// browser-friendly versions. It lets you specify an alternate
			// browser-specific entry point. Note that it is possible for a
			// package to use both the browser and module field together (see
			// the note below).
			//
			// The default main fields depend on the current platform setting.
			// These defaults should be the most widely compatible with the
			// existing package ecosystem. But you can customize them like this
			// if you want to
			// 'main-fields': 'main',
			'main-fields': 'main,module',
			// 'main-fields': 'module',

			minify: false, // minified server-side code makes debugging harder!

			// tsup automatically excludes packages specified in the
			// dependencies and peerDependencies fields in the packages.json
			// You can still use the noExternal option to reinclude packages in
			// the bundle
			noExternal: [
				/^@enonic\/js-utils/,
				/^@enonic\/react-components/,

				// SyntaxError: Unsupported RegExp flag: y
				// 'html-format', // requires String.raw polyfill and navigator and Object.entries

				// 'diffable-html', // requires stream

				// NOPE drags in entities with Uint16Array
				// 'hast-util-format',
				// 'hast-util-from-html',
				// 'hast-util-to-html',

				// /^entities/, // This only helps for the Enonic XP server code, not the React4xp/Graal server code.
			],

			// https://esbuild.github.io/api/#platform
			//
			// node:
			// * When bundling is enabled the default output format is set to
			// cjs, which stands for CommonJS (the module format used by node).
			// ES6-style exports using export statements will be converted into
			// getters on the CommonJS exports object.
			// * All built-in node modules such as fs are automatically marked
			// as external so they don't cause errors when the bundler tries to
			// bundle them.
			// * The main fields setting is set to main,module. This means tree
			// shaking will likely not happen for packages that provide both
			// module and main since tree shaking works with ECMAScript modules
			// but not with CommonJS modules.
			// Unfortunately some packages incorrectly treat module as meaning
			// "browser code" instead of "ECMAScript module code" so this
			// default behavior is required for compatibility. You can manually
			// configure the main fields setting to module,main if you want to
			// enable tree shaking and know it is safe to do so.
			// * The conditions setting automatically includes the node
			// condition. This changes how the exports field in package.json
			// files is interpreted to prefer node-specific code.
			// * If no custom conditions are configured, the Webpack-specific
			// module condition is also included. The module condition is used
			// by package authors to provide a tree-shakable ESM alternative to
			// a CommonJS file without creating a dual package hazard. You can
			// prevent the module condition from being included by explicitly
			// configuring some custom conditions (even an empty list).
			// * When the format is set to cjs but the entry point is ESM,
			// esbuild will add special annotations for any named exports to
			// enable importing those named exports using ESM syntax from the
			// resulting CommonJS file. Node's documentation has more
			// information about node's detection of CommonJS named exports.
			// * The binary loader will make use of node's built-in Buffer.from
			// API to decode the base64 data embedded in the bundle into a
			// Uint8Array. This is faster than what esbuild can do otherwise
			// since it's implemented by node in native code.
			// platform: 'node',
			//
			// neutral:
			// * When bundling is enabled the default output format is set to
			// esm, which uses the export syntax introduced with ECMAScript 2015
			// (i.e. ES6). You can change the output format if this default is
			// not appropriate.
			// * The main fields setting is empty by default. If you want to use
			// npm-style packages, you will likely have to configure this to be
			// something else such as main for the standard main field used by
			// node.
			// * The conditions setting does not automatically include any
			// platform-specific values.
			platform: 'neutral',

			shims: false, // https://tsup.egoist.dev/#inject-cjs-and-esm-shims
			sourcemap: false,
			target: 'es5',
			tsconfig: 'tsconfig.json'
		};
	}
	if (options.d === 'build/resources/main/assets') {
		return {
			entry: CLIENT_FILES.map(dir => dir.replace(/\\/g,'/')),
			external: [
				'react'
			],
			format: [
				'cjs',
				'esm'
			],
			minify: true,
			platform: 'browser',
			sourcemap: true,
		};
	}
	throw new Error(`Unconfigured directory:${options.d}!`)
})
