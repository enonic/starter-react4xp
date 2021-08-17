[//]: <> (starter-react4xp readme: USE THIS FILE TO EDIT THE ROOT's README.md! This will generate the actual README.md and README.adoc with placeholder values inserted. Run gradle task before commit: updateReadme - this should autorun when building. Version placeholders: 0.6.3, 7.0.0, 1.0.0 and 0.2.1. Leave this line in place - and if you edit it, remember to also update it in the search/replace target in build.gradle! )

# starter-react4xp

This starter provides the building blocks for integrating React in Enonic XP on client- and serverside.
 
This covers build steps and runtime: a Gradle/NPM build setup with [a library](https://github.com/enonic/lib-react4xp) and a few [companion NPM packages](https://www.npmjs.com/package/react4xp). Compiles and serves standard JSX-format React components from XP.

A simple example XP part with React rendering and a barebone page controller is included.

**See [the react4xp introduction](https://developer.enonic.com/templates/react4xp)** for a tutorial and more comprehensive documentation.

Requires: installed [Enonic XP 7.x](https://developer.enonic.com/) with [Gradle](https://docs.gradle.org/current/userguide/getting_started.html) and Node/NPM. 





## Install

1. The three usual options: 
   - install the starter from [Enonic Market](https://market.enonic.com/vendors/enonic/react4xp-starter), 
   - or clone it down from [the github repo](https://github.com/enonic/starter-react4xp), 
   - or use [the Enonic CLI](https://developer.enonic.com/docs/enonic-cli/master):
    ```commandline
    enonic project create -r starter-react4xp
    ```
2. Build it locally: 
    ```commandline
    enonic project deploy
    ```

NOTE: if you use a version of the starter with version 1.1.2 or lower, you will need to run `npm install` before "enonic project deploy" or other gradle/enonic CLI commands.

## Easy Content Studio setup after building

For complete setup info, see [the react4xp introduction](https://developer.enonic.com/templates/react4xp). 

Crash course, after getting this starter running:

- Start XP
- Enter Content Studio
- Add a Site. Give it a display name and activate this starter app. 
- Select the "Default Page" page controller (and apply/save).


## Versions and compatibility

This is version ###STARTER_VERSION###.

| Version / tag    | Minimum XP version | Notes |
| ---------------- | ---------- | --------------|
| 2.0.0            | 7.6.0  | Updates to lib-react4xp@2.0.0 and npm-react4xp@2.0.0, for using **webpack 5** and webpack-cli 4.
| 1.7.1            | 7.6.0  | Bugfixes
| 1.5.0            | 7.6.0  | Version leap: sync with versions of lib-react4xp (1.5.0) and npm-react4xp (1.5.4), which bring SSR-engine improvements to error reporting and concurrent multi-thread  rendering.
| 1.2.1            | 7.6.0  | Update XP version, remove unused libraries
| 1.2.0            | 7.5.0  | Easier build: no longer needs "npm install" before gradle tasks or "enopnic project deploy".
| 1.1.0            | 7.3.0  | Easy-to-set-up guillotine: adds a ready-to-map guillotine API for backend and frontend queries, and a frontend request wrapper. NPM package react4xp@1.1.4 replaces a lot of build setup in this parent project's build.gradle with one line (`apply from:`...), and bugfixes style handling in client-side `.renderWithDependencies. |
| 1.0.1            | 7.3.0  | First full release, compatible with updated guide.  |
| 0.6.3            | 7.0.0  | Lazy-loading assets on server-side rendering. Collected all the react4xp NPM packages into one. Support: CSS modules with asset handling.  |
| 0.6.1            | 7.0.0  | Fixed Page/Layout support. Free structure of entry and chunk directories. Babel upgrade.  |
| 0.2.10           | 7.0.0  | Fixes windows build issue #18. |
| 0.2.8            | 7.0.0  | Beta release for XP7 |

This table (and the master branch) covers XP7-compatible code. For XP6-compatible versions, see the [XP6_master branch](https://github.com/enonic/starter-react4xp/tree/XP6_master). 

More code examples: see the [examples branch](https://github.com/enonic/starter-react4xp/tree/examples).

Other versions can be found in this repo, but may be differently structured and/or buggy/painful.

## Future development

React4xp is a work in progress and frequently updated. 

For now there are some [known issues](https://github.com/enonic/lib-react4xp/issues) we are looking into. Feedback, suggestions, uncovered use cases, problems, or stories of ensuing hilarity are **very welcome here** - it will hugely help us improve the React support in XP!

### Some notes:
- You'll note that after (re)starting the server or (re)deploying the app, the SSR engine [takes a few seconds to start up](https://developer.enonic.com/docs/react4xp/master/hello-react#first_serverside_render_can_be_slow). This is for caching the react components on the first rendering, making subsequent server-side renderings of the same component very fast, even with different props.
