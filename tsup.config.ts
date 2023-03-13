import {globSync} from 'glob';
import {print} from 'q-i';
import {join} from 'path';
import { defineConfig } from 'tsup';


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
	}
);
// print(SERVER_FILES, { maxItems: Infinity });

export default defineConfig((options) => {
	// print(options, { maxItems: Infinity });
	if (options.d === 'build/resources/main') {
		return {
			entry: SERVER_FILES.map(dir => dir.replace(/\\/g,'/')),
			external: [
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
			minify: false, // minified server-side code makes debugging harder!
			platform: 'node',
			shims: false, // https://tsup.egoist.dev/#inject-cjs-and-esm-shims
			sourcemap: false,
			target: 'es5'
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
			sourcemap: true
		};
	}
	throw new Error(`Unconfigured directory:${d}!`)
})
