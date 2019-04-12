# starter-react4xp

Beta: 0.2.0

React4xp starter with examples, for Enonic XP7.0.

This starter imports [a library](https://github.com/enonic/lib-react4xp-runtime) and a few companion NPM packages, that transpiles and serves JSX-format React components from Enonic XP 7.

Includes build setup and some example parts that can be added and viewed in Content Studio, showing React components in different setups that get props from XP data. A  standalone HTML example is also included in `src/main/resources/webapp/webapp.es6`.

Meant to demonstrate how to use React with XP, as well as help you kickstart a React4xp project of your own!

## Install

First, follow the setup description for [Enonic XP 7.0](https://developer.enonic.com/start). Download this starter from [Enonic Market](https://market.enonic.com) or [Github](https://github.com/enonic/starter-react4xp). 

Run:
```bash
> enonic project deploy
```

## The examples

Once you have it installed, you can run XP. Two standalone HTML examples are ready to see out of the box - open the Application Admin tool in XP, mark React4xp Example Starter and scroll down to the link below **Web App**. There, you should see a link, something like [localhost:8080/app/com.enonic.app.react4xp](localhost:8080/app/com.enonic.app.react4xp) depending on your setup.

For using the component examples in this starter, open Content Studio. Create a website, and connect it to the React4xp app. Select the default page controller. Now you can edit the site item, and drag the four parts into the page below the static header. They don't look like much, but should provide usable code examples of how to hook up any part with any react component.

## Versions and compatibility:

| Version / tag    | Minimum XP version |
| ---------------- | ---------- |
| 0.2.0            | 7.0.0  |
| 0.1.0            | 6.15.0 |

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
