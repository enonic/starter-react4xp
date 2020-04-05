[//]: <> (starter-react4xp readme:   DO NOT EDIT!   Autogenerated and auto-replaced from source docs/README.src.md, write docs there instead! )

# starter-react4xp

This starter provides the building blocks for integrating React in Enonic XP on client- and serverside.
 
This covers build steps and runtime: a Gradle/NPM build setup with [a library](https://github.com/enonic/lib-react4xp) and a few [companion NPM packages](https://www.npmjs.com/package/react4xp). Compiles and serves standard JSX-format React components from XP.

A simple example XP part with React rendering and a barebone page controller is included.

**See [the react4xp introduction](https://developer.enonic.com/templates/react4xp)** for a tutorial and more comprehensive documentation.

Requires: installed [Enonic XP 7.x](https://developer.enonic.com/) with [Gradle](https://docs.gradle.org/current/userguide/getting_started.html) and Node/NPM. 



## Easy setup after building

For complete setup info, see [the react4xp introduction](https://developer.enonic.com/templates/react4xp). Crash course, after getting this starter running:

- Start XP
- Enter Content Studio
- Add a Site. Give it a display name and activate this starter app. 
- Select the "Default Page" page controller (and apply/save).
- You now see a drag and drop region. Insert a part.
- In the dropdown menu, choose the "Hello React" part.


## Versions and compatibility

This is version 0.6.3.

| Version / tag    | Minimum XP version | Notes |
| ---------------- | ---------- | --------------|
| 0.6.3            | 7.0.0  | Lazy-loading assets on server-side rendering. Collected all the react4xp NPM packages into one. |
| 0.6.2            | 7.0.0  | Support: CSS modules with asset handling.  |
| 0.6.1            | 7.0.0  | Fixed Page/Layout support. Free structure of entry and chunk directories. Babel upgrade.  |
| 0.2.10           | 7.0.0  | **Most stable and tested version, currently.** Fixes windows build issue #18. |
| 0.2.8            | 7.0.0  | Beta release for XP7 |

This table (and the master branch) covers XP7-compatible code. For XP6-compatible versions, see the [XP6_master branch](https://github.com/enonic/starter-react4xp/tree/XP6_master). 

More code examples: see the [examples branch](https://github.com/enonic/starter-react4xp/tree/examples).

Other versions can be found in this repo, but may be differently structured and/or buggy/painful.

## Future development

**Being a first-release**, we will keep working on this intensely. 

For now there are a couple of [known issues](https://github.com/enonic/lib-react4xp/issues) we are looking into. Feedback, suggestions, uncovered use cases, problems, or stories of ensuing hilarity are **very welcome here** - it will hugely help us improve the React support in XP!

### Some notes:
  - You'll note that after (re)starting the server or (re)deploying the app, the SSR engine takes a few seconds to start up. This is for caching the react components on the first rendering, making subsequent server-side renderings of the same component very fast, even with different props.
