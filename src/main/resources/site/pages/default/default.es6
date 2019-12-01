const portal = require('/lib/xp/portal');

const React4xp = require('/lib/enonic/react4xp');

// Handle the GET request
exports.get = function(req) {
    const component = portal.getComponent();
    const content = portal.getContent();

    return {
        body: React4xp.render(
            component,
            {component, displayName: content.displayName},
            req
        ). body
    };

    // IMPORTANT:   render(component, ...) resolves to default.jsx in this folder (since it's in the same folder and has
    //              the page controller's own name, 'default'). That JSX file has <Region>'s in it!
    //
    //              Guidelines for rendering JSX entries that contain XP regions, directly or by imports:
    //
    //              Current versions of XP (6.x, 7.0, 7.1 and probably 7.2) require regions (that is, the entry containing
    //              them) to be RENDERED ON THE SERVER SIDE (so, don't activate `clientRender: true`), and the rendered
    //              result of that to be part of the `body` field in the controller's returned response (so, don't insert
    //              the rendered result into a different React4xp entry that is rendered with `clientRender: true`).
};


/* ----------------------------------------------

The above syntax is equivalent to:

const React4xp = require('/lib/enonic/react4xp');
(...)

const content = portal.getContent();
return {
    body: new React4xp('site/pages/default/default')
        .setProps({ content })
        .renderBody()
};

renderEntryToHtml and renderRegionBody do NOT add a container element around the rendered output, as React4xp.render does, and they don't
automatically add pageContributions to the client output.

renderRegionBody is meant as a shorthand wrapper, with the functionality of skipping the jsxPath and automatically using the
same-name-samefolder JSX entry, or falling back to the built-in Page.jsx if that's missing.

You can think of the params argument of renderRegionBody as the props of the JSX entry. All the attributes except jsxPath
are passed directly. For example, to use the built-in bare-bone Page.jsx
(https://github.com/enonic/react4xp-templates/blob/master/src/_entries/react4xp-templates/Page.jsx)
instead of writing your own JSX entry, you could skip the jsxPath and control the region rendering by passing these extra optional props:

renderRegionBody({
            regionNames: ["main"]   ,               // <-- add regionNames to control which regions are added, in that order. They must exist in the xml definition (default.xml). If omitted, all regions are added, in the order of appearance in the data object.
            regionClasses: "default-page-region",   // <-- adds this class to each region container HTML element. Can also be an object, where the keys are region names and values are an added class string.
    });

---------------------------------------------- */
