# starter-react4xp

React4xp starter, beta version 0.1.8, for Enonic **XP 6**. 

<strong style="color:darkgreen">See [the React4xp tutorial](https://developer.enonic.com/templates/react4xp) for an introduction.</strong> That introduction is oriented toward XP 7, but the differences between the XP 6 and XP 7 versions are minor and mostly focused on the setup process and the build config. So the vast majority of that intro can be used for this starter as well. 

To see the XP 6 setup with the same examples as the tutorial, check out the [XP6_examples branch](https://github.com/enonic/starter-react4xp/tree/XP6_examples).

If you're looking for the XP 7-compatible code, it's found at the [master branch](https://github.com/enonic/starter-react4xp/tree/master). XP 7 code examples: see the [examples branch](https://github.com/enonic/starter-react4xp/tree/examples).

---

## Quick overview

This starter provides the building blocks for client- and serverside React support in Enonic XP: a build setup with [a library](https://github.com/enonic/lib-react4xp) and a few [companion NPM packages](https://github.com/enonic/lib-react4xp#npm-package-overview). This compiles and serves JSX-format React components from Enonic XP 7.

To make it easier to get started, a simple example part with react rendering and a barebone page controller is included. 

## Setting up the included React part in Content Studio:

- Download and build this starter in the regular XP 6 way
- Start XP
- Enter Content Studio
- Add a Site. Give it a display name and activate this starter app. 
- Select the "Default Page" page controller (and apply/save).
- You now see a drag and drop region. Insert a part.
- In the dropdown menu, choose the "Hello React" part.


## Versions and compatibility

| Version / tag    | Minimum XP version | Notes |
| ---------------- | ---------- | --------------|
| 0.2.8            | 7.0.0  | For XP7 |
| 0.1.8            | 6.15.0 | For XP6 |

Earlier versions can be found, but may be differently structured and/or buggy/painful.

## Future development

**Being a first-release beta**, we will keep working on this intensely. For now there are a couple of [known issues](https://github.com/enonic/lib-react4xp/issues) we are looking into. Feedback, suggestions, uncovered use cases, problems, or stories of ensuing hilarity are **very welcome here** - it will hugely help us improve the React support in XP!

### Some notes:
  - The SSR engine caches the react components on the first rendering, making subsequent server-side renderings of the same component very fast - even with different props. However, initializing the rendering engine after restarting the server or redeploying the app, is pretty slow: on the scale of several seconds.
