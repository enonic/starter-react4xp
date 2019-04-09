# starter-react4xp

React4xp starter with examples, for Enonic XP7.0.

This starter imports [a library](https://github.com/enonic/lib-react4xp-runtime) and a few companion NPM packages, that transpiles and serves JSX-format React components from Enonic XP 7.

Includes build setup and some example parts that can be added and viewed in Content Studio, showing React components in different setups that get props from XP data.

Meant to demonstrate how to use React with XP, as well as kickstarting a React4xp project of your own!

## Install

First, follow the setup description for [Enonic XP 7.0](https://developer.enonic.com/start). Download this starter from [Enonic Market](https://market.enonic.com) or [Github](https://github.com/enonic/starter-react4xp). 

Run:
```bash
> npm i

> enonic project deploy
```

## Future development

This is a first-release beta. We will keep working on this intensely, but feel free to try it out for yourself.
 
Feedback, suggestions, uncovered use cases, problems, or stories of ensuing hilarity are [very much welcome](https://github.com/enonic/starter-react4xp/issues) - it will hugely help us build great React support in XP!

### Issues and known technical bugs
  - Most importantly: **Windows testing has been scarce!** This version might break in Windows in unknown ways, or not build at all. Use with caution. OSX seems solid so far.
  
  - If there are no JSX components to transpile below the folders `src/main/react4xp/_components` nor `src/main/resources/site`, it seems the starter won't build.

### Priority improvements
  - Simplifying the NPM imports and the complex build setup in `build.gradle`. Should be wrapped in fewer components before long.  

  - Speeding up the first SSR rendering of each component after updating them in XP 7.
  
  - Finishing the library and a similar starter for XP 6. 
