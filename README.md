# starter-react4xp

React4xp starter, beta version 0.2.3, for Enonic **XP7**. 

**See [the documentation](https://developer.enonic.com/templates/react4xp) for introduction and comprehensive info!**

Enonic XP6-compatible code is at the [XP6_master branch](https://github.com/enonic/starter-react4xp/tree/XP6_master). Code examples: see the [examples branch](https://github.com/enonic/starter-react4xp/tree/examples).

---

## Quick overview

This starter provides the building blocks for client- and serverside React support in Enonic XP: a build setup with [a library](https://github.com/enonic/lib-react4xp) and a few [companion NPM packages](https://github.com/enonic/lib-react4xp#npm-package-overview). This compiles and serves JSX-format React components from Enonic XP 7.


## Versions and compatibility

| Version / tag    | Minimum XP version | Notes |
| ---------------- | ---------- | --------------|
| 0.2.3            | 7.0.0  | Beta release for XP7 |
| 0.1.3            | 6.15.0 | Beta release for XP6 |

Earlier versions can be found, but are differently structured and may be buggy and/or painful.

## Future development

**Being a first-release beta**, we will keep working on this intensely. For now there are a couple of known issues we are looking into.
 
Feedback, suggestions, uncovered use cases, problems, or stories of ensuing hilarity are [very much welcome](https://github.com/enonic/starter-react4xp/issues)! It will hugely help us improve the React support in XP!

### Issues and priority improvements
  - SSR is cached on the first rendering, making subsequent server-side renderings of the same component very fast (even with different props). However, the first rendering on the server of each component is pretty slow, on the scale of several seconds.
  - Simplifying the NPM imports and the complex build setup in `build.gradle`. Should be wrapped in fewer components.  
  - Supporting XP layouts, not just parts and pages.
