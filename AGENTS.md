# AGENTS.md

This file provides guidance to AI agents like Claude and Copilot when working with code in this repository.

## Description

React4xp Starter for Enonic XP 8 — a best-practices template for building server-rendered + client-hydrated React apps on Enonic XP. Based on the `starter-ts` TypeScript starter, with React4xp added for component rendering.

The starter source is at https://github.com/enonic/starter-react4xp

## Build system

Two build pipelines write into `build/resources/main/`, split purely by file extension:

1. **tsdown** compiles server `.ts` (controllers, services, processors, utils) and client `assets/`. Config: `tsdown.config.ts`. Run via `npm run build`.
2. **@enonic/react4xp** (v7) compiles React `.tsx` (components + entries) for server-side rendering and client hydration, using its own internal tsup + rspack pipeline (there is no project-level webpack). Output goes to `build/resources/main/r4xAssets/`. It is driven by the Gradle `react4xp` task, which sets the required `R4X_*` environment variables; it cannot be run standalone with `npm run build:react4xp`.

Both pipelines use a shared, non-cleaning output dir (`clean: false`), so order does not matter. Gradle (via `com.github.node-gradle.node`) orchestrates npm; the full build/deploy cycle goes through the **Enonic CLI**, which wires the build to the sandbox's XP version and Java compiler.

`xpVersion` in `gradle.properties` declares the target XP version; the `@enonic-types/*` packages in `package.json` must match it.

### React4xp config files (do not rename)

React4xp resolves two project-level config files by hardcoded name:
- `react4xp.config.js` — entry directories.
- `webpack.config.react4xp.js` — rspack overrides (CSS modules, sass, asset loaders). Despite the "webpack" name, react4xp runs rspack; the filename is fixed.

## Commands

### Enonic CLI (preferred for build & deploy)

```bash
enonic project create -r starter-react4xp   # Create a new app from this starter
enonic dev                                   # Build, deploy, watch (main dev workflow)
enonic project build                         # Full build (wired to the sandbox)
enonic project deploy                        # Build and deploy to the sandbox
```

### npm scripts (TypeScript tooling)

```bash
npm run build                 # tsdown: server .ts + client assets
npm run build:react4xp        # react4xp .tsx (only works under the Gradle react4xp task)

npm run check                 # types + lint concurrently
npm run check:types:server    # tsc --noEmit on server .ts
npm run check:types:react4xp  # tsc --noEmit on react4xp .tsx
npm run lint                  # ESLint with cache

npm test                      # Jest (server + client projects)
```

### Gradle (used internally by the Enonic CLI)

```bash
./gradlew build               # npmInstall + npmBuild + react4xp + check + test + jar
./gradlew build -Pdev         # Development build (NODE_ENV=development, no minification)
./gradlew deploy              # Build and deploy
```

## Architecture

### Server build (tsdown)

- `src/main/resources/**/*.ts` except `assets/` and `.tsx`.
- CommonJS, `target: es2015`, `platform: neutral`, not minified (easier debugging), `clean: false`.
- XP platform libs (`/lib/xp/*`, `/lib/enonic/*`, `/lib/guillotine`, ...) and app-local module dirs (`/react4xp/*`, `/types/*`, `/services/*`, ...) are `external` — XP resolves them by resource path at runtime, emitted as `require("/...")`.
- `@enonic/js-utils` (a runtime `dependency`, used by `react4xp/utils/requestUtils.ts`) is force-bundled via `deps.alwaysBundle`, because tsdown externalizes `dependencies` by default.
- tsconfig: `src/main/resources/tsconfig.json` (no `target` — keep it commonjs/node-resolution so `/lib/*` and package subpaths resolve).

#### Nashorn constraint (important)

XP 8.0.1 executes server controllers on **Nashorn**, which supports ES5 + only *part* of ES2015. tsdown/oxc cannot target below `es2015`, and it **preserves** ES2015-native syntax that Nashorn does not implement. So server `.ts` source **must avoid**:

- **destructuring** — `const {a, b} = obj` / `function f({a}) {}` → use `const a = obj.a;`
- **default parameters** — `function f(x = 1) {}` → `function f(x?) { if (x === undefined) x = 1; }`

Syntax *above* es2015 (object spread `...`, optional chaining `?.`, nullish `??`) is fine — oxc down-levels it to feature-guarded es5-safe helpers. Arrow functions, `let`/`const`, template literals, classes, and object-literal shorthand (`{a}` in a literal, not an assignment pattern) are supported by Nashorn. If you add destructuring/default-params and the controller throws `ES6 ... is not yet implemented` at runtime, that's this constraint.

### Client builds

- **assets** (`src/main/resources/assets/**`): tsdown, ESM, `platform: browser`, minified in production. tsconfig: `src/main/resources/assets/tsconfig.json`. (Currently empty of `.ts`; the tsdown asset target is skipped when there are no inputs.)
- **react4xp** (`src/main/resources/react4xp/**/*.tsx`): react4xp's tsup+rspack → `build/resources/main/r4xAssets/`. tsconfig: `src/main/resources/react4xp/tsconfig.json`.

### React4xp conventions

- `react4xp/components/<name>/` — a React component: `<Name>.tsx` (View), `<Name>.module.css` (CSS module), `<Name>Processor.ts` (server-side data prep).
- `react4xp/entries/` — entry points (e.g. `App.tsx`). Each entry sets `displayName`.
- `react4xp/componentRegistry.tsx` — maps content types/components to React Views (client + SSR).
- `react4xp/dataFetcher.ts` — maps content types/components to server-side processors.
- Render flow: a controller (`cms/app.ts`) calls `dataFetcher.process(...)` to build props, then `render('App', data, request, {body, id})` (from `/lib/enonic/react4xp`) to SSR the tree and emit the hydration scripts.

### Path mappings

The server tsconfig maps `/lib/xp/*` → `@enonic-types/lib-*`, `/lib/enonic/asset` → `@enonic-types/lib-asset`, `/lib/enonic/react4xp` → `@enonic-types/lib-react4xp`, and `/*` → `src/main/resources/*`. These mirror how XP resolves absolute imports at runtime.

### Testing

Two Jest projects (config: `jest.config.ts`):
- **Server** (`src/jest/server/`): Node env, XP globals (`app`, `log`, ...) mocked in `setupFile.ts`.
- **Client** (`src/jest/client/`): jsdom env.
Each extends the matching source tsconfig.

### XP globals

Server code has Enonic runtime globals (`app`, `log`, `require`, `resolve`, `__`) via `@enonic-types/global`. Real at runtime; mocked in tests.
