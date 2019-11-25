const portal = require('/lib/xp/portal');

import { renderPageBody } from '/lib/enonic/react4xp/templates';

// Handle the GET request
exports.get = function(req) {
    // Get the content that is using the page
    const content = portal.getContent();

    return {

        // renderPageBody API and usage:
        //      https://github.com/enonic/lib-react4xp/blob/master/src/main/resources/lib/enonic/react4xp/templates.es6
        //      https://github.com/enonic/react4xp-templates/blob/master/src/_entries/react4xp-templates/Page.jsx
        body: renderPageBody({
            content,                                // <--  Basic data
            jsxPath: 'site/pages/default/default',  // <-- Optional: points to a particular JSX entry. See more in the description below.
            regionNames: ["main"]   ,               // <-- Optional: add regionNames to control which regions are added, or in which order. They must exist in the xml definition (default.xml). If omitted, all regions are added, in the order of appearance in the data object.
            regionClasses: "default-page-region",   // <-- Optional: adds this class to each region container HTML element. Can also be an object, where the keys are region names and values are an added class string.
            props: {}                               // <-- Optional: passes additional props to the JSX entry. If available, regionNames and regionClasses above are already passed as props and don't need to be added here.
        })
    };
};


/* ----------------------------------------------

This syntax is equivalent:

const React4xp = require('/lib/enonic/react4xp');

(...)

return {
    body: new React4xp('site/pages/default/default')
        .setProps({
            content,
            ...props
        })
        .renderEntryToHtml()
}

---------------------------------------------- */
