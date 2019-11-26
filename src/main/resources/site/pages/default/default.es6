const portal = require('/lib/xp/portal');

import { renderPageBody } from '/lib/enonic/react4xp/templates';

// Handle the GET request
exports.get = function(req) {
    // Get the content that is using the page
    const content = portal.getContent();

    return {

        // renderPageBody API and usage:
        //      https://github.com/enonic/lib-react4xp/blob/master/src/main/resources/lib/enonic/react4xp/templates.es6
        body: renderPageBody({
            content,
            jsxPath: 'site/pages/default/default',  // <-- Optional: points to a particular JSX entry. Can be skipped in this case, since default.jsx is in this folder and has the same name. Note that if you skip the jsxPath param WITHOUT a same-name-same-folder JSX entry, renderPageBody will fall back to using a built-in JSX entry: https://github.com/enonic/react4xp-templates/blob/master/src/_entries/react4xp-templates/Page.jsx
        }),
    };
};


/* ----------------------------------------------

The renderPageBody call above syntax is equivalent to a more regular react4xp, but called with renderEntryToHtml instead of render:

const React4xp = require('/lib/enonic/react4xp');
(...)
return {
    body: new React4xp('site/pages/default/default')
        .setProps({ content })
        .renderEntryToHtml()
};

renderEntryToHtml and renderPageBody do NOT add a container element around the rendered output, as render does, and they don't
automatically add pageContributions to the client output.

renderPageBody is meant as a shorthand wrapper, with the functionality of skipping the jsxPath and automatically using the
same-name-samefolder JSX entry, or falling back to the built-in Page.jsx if that's missing.

You can think of the params argument of renderPageBody as the props of the JSX entry. All the attributes except jsxPath
are passed directly. For example, to use the built-in bare-bone Page.jsx
(https://github.com/enonic/react4xp-templates/blob/master/src/_entries/react4xp-templates/Page.jsx)
instead of writing your own JSX entry, you could skip the jsxPath and control the region rendering by passing these extra optional props:

renderPageBody({
            content,
            regionNames: ["main"]   ,               // <-- add regionNames to control which regions are added, in that order. They must exist in the xml definition (default.xml). If omitted, all regions are added, in the order of appearance in the data object.
            regionClasses: "default-page-region",   // <-- adds this class to each region container HTML element. Can also be an object, where the keys are region names and values are an added class string.
    });

---------------------------------------------- */
