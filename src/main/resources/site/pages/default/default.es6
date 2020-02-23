const portal = require('/lib/xp/portal');

import React4xp from '/lib/enonic/react4xp';
const thymeleaf = require('/lib/thymeleaf');

var view = resolve('default.html');

// Handle the GET request
exports.get = function(req) {
    // Get the content that is using the page
    const content = portal.getContent();

    const id = content._id;

    // Prepare the container model
    const model = {
        reactAppId: id
    };
    const alreadyRenderedView = thymeleaf.render(view, model);
    const alreadyPageContributions = {
        headBegin: `<title>${content.displayName}</title>`
    };

    return React4xp.render(
        null,
        {
            title: content.displayName,
            regionsData: content.page.regions
        },
        req,
        {
            id,
            body: alreadyRenderedView,
            pageContributions: alreadyPageContributions
        }
    );
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

/*

// Pure thymeleaf controller:

const portal = require('/lib/xp/portal');
const thymeleaf = require('/lib/thymeleaf');

// Specify the view file to use
var view = resolve('default.html');


// Handle the GET request
exports.get = function(req) {
    // Get the content that is using the page
    const content = portal.getContent();

	const mainRegion = content.page.regions.main;

    // Prepare the model that will be passed to the view
    const model = { content,  mainRegion };

    // Render the dynamic HTML with values from the model
    const body = thymeleaf.render(view, model);

    // Return the response object
    return { body }
};


 */
