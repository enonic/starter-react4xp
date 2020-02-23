# starter-react4xp

React4xp starter, beta version **0.2.10**. Higher alpha versions are available, see the table below.

<strong style="color:darkgreen">See [the documentation](https://developer.enonic.com/templates/react4xp) for introduction and comprehensive info!</strong>

The master branch covers XP7-compatible code. XP6-compatible code is covered at the [XP6_master branch](https://github.com/enonic/starter-react4xp/tree/XP6_master). Code examples: see the [examples branch](https://github.com/enonic/starter-react4xp/tree/examples).

---

## Quick overview

This starter provides the building blocks for client- and serverside React support in Enonic XP: a build setup with [a library](https://github.com/enonic/lib-react4xp) and a few [companion NPM packages](https://github.com/enonic/lib-react4xp#npm-package-overview). This compiles and serves JSX-format React components from Enonic XP 7.

To make it easier to get started, a simple example part with react rendering and a barebone page controller is included. 

## Easy setup after building: 

- Start XP
- Enter Content Studio
- Add a Site. Give it a display name and activate this starter app. 
- Select the "Default Page" page controller (and apply/save).
- You now see a drag and drop region. Insert a part.
- In the dropdown menu, choose the "Hello React" part.


## Versions and compatibility

| Version / tag    | Minimum XP version | Notes |
| ---------------- | ---------- | --------------|
| 0.6.3            | 7.0.0  | Lazy-loading assets on server-side rendering. Collected all the react4xp NPM packages into one. |
| 0.6.2            | 7.0.0  | Support: CSS modules with asset handling.  |
| 0.6.1            | 7.0.0  | Fixed Page/Layout support. Free structure of entry and chunk directories. Babel upgrade.  |
| **0.2.10**           | 7.0.0  | **Most stable and tested version, currently.** Fixes windows build issue #18. For XP7. |
| 0.2.8            | 7.0.0  | Beta release for XP7 |
| 0.1.10           | 6.15.0 | Fixes windows build issue #18. For XP6. |
| 0.1.8            | 6.15.0 | Beta release for XP6 |

Other versions can be found in this repo, but may be differently structured and/or buggy/painful.

Also, whenever you want to upgrade your lib-react4xp and/or the react4xp-* NPM packages, have a look at this [table of tested version combinations](https://github.com/enonic/lib-react4xp#version-and-compatibility).

## Future development

**Being a first-release beta**, we will keep working on this intensely. For now there are some [known issues](https://github.com/enonic/lib-react4xp/issues) we are looking into (that is the issues page where all react4xp issues are collected, even for the problems/solutions that actually belong in other companion repos). 

Feedback, suggestions, uncovered use cases, problems, or stories of ensuing hilarity are **hugely welcome** - it will hugely help us improve the React support in XP!

### Some notes:
  - The SSR engine caches the react components on the first rendering, making subsequent server-side renderings of the same component very fast - even with different props. However, initializing the rendering engine after restarting the server or redeploying the app, is pretty slow: on the scale of several seconds.
