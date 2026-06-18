import {globSync} from 'glob';
import {defineConfig} from 'tsdown';

const SRC = 'src/main/resources';
const SRC_ASSETS = `${SRC}/assets`;
const DST = 'build/resources/main';
const DST_ASSETS = `${DST}/assets`;

const dev = process.env.NODE_ENV === 'development';
const logLevel: 'silent' | 'info' = ['QUIET', 'WARN'].includes(process.env.LOG_LEVEL_FROM_GRADLE || '') ? 'silent' : 'info';

// XP loads each controller/service by its resource path, so every source file
// must become its own output file with the directory tree intact.
function entries(dir: string, exts: string, ignore: string[] = []): Record<string, string> {
  return Object.fromEntries(
    globSync(`${dir}/**/*.${exts}`, {posix: true, ignore})
      .map(file => [file.slice(dir.length + 1).replace(/\.[^.]+$/, ''), file]),
  );
}

// Server build excludes assets/ and React (.tsx is owned by @enonic/react4xp).
// react4xp's .ts files (dataFetcher, processors, utils) ARE server code: compiled here.
const serverEntry = entries(SRC, '{ts,js}', [`${SRC_ASSETS}/**`]);
const assetEntry = entries(SRC_ASSETS, '{tsx,ts,jsx,js}');

// App-local module dirs + platform libs are resolved by XP at runtime — never bundle.
// Ported from the previous tsup.config.ts external list.
const external = [
  /^\/admin\//,
  /^\/error\//,
  /^\/headless\//,
  /^\/lib\//,
  /^\/react4xp\//,
  /^\/services\//,
  /^\/site\//,
  /^\/types\//,
  /^\/webapp\//,
  '/lib/enonic/asset',
  '/lib/enonic/react4xp',
  '/lib/guillotine',
  '/lib/thymeleaf',
  /^\/lib\/xp\//,
];

export default defineConfig([
  ...(Object.keys(serverEntry).length ? [{
    entry: serverEntry,
    outDir: DST,
    format: 'cjs' as const,
    target: 'es2015',
    platform: 'neutral' as const,
    clean: false,
    dts: false,
    minify: false,
    sourcemap: false,
    logLevel,
    tsconfig: `${SRC}/tsconfig.json`,
    // @enonic/js-utils is a runtime dependency used by server code (requestUtils.ts).
    // tsdown externalizes dependencies by default, so force it to be bundled.
    deps: {
      alwaysBundle: [/^@enonic\/js-utils/],
    },
    inputOptions: {
      external,
      resolve: {
        mainFields: ['main', 'module'],
      },
    },
    outputOptions: {
      chunkFileNames: '_chunks/[name]-[hash].js',
    },
  }] : []),
  ...(Object.keys(assetEntry).length ? [{
    entry: assetEntry,
    outDir: DST_ASSETS,
    format: 'esm' as const,
    target: 'es2015',
    platform: 'browser' as const,
    clean: false,
    dts: false,
    minify: !dev,
    sourcemap: !dev,
    logLevel,
    tsconfig: `${SRC_ASSETS}/tsconfig.json`,
  }] : []),
]);
