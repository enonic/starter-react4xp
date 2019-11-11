const portal = require('/lib/xp/portal');

import { renderPageBody } from '/lib/enonic/react4xp/templates';
const React4xp = require('/lib/enonic/react4xp');

// Handle the GET request
exports.get = function(req) {
    // Get the content that is using the page
    const content = portal.getContent();

    // Works both with and without a local, same-name entry (site/pages/default/default.jsx).
    // Without a local entry, the generic fallback is used: react4xp-templates/Page.jsx:
    return { body: renderPageBody(content) };

    // works:
    //return { body: renderPageBody(content, {jsxPath: 'react4xp-templates/Page'}) };

    // works:
    //return { body: renderPageBody(content, {jsxPath: 'site/pages/default/default'}) };


    // works with valid jsxPath (here site/pages/default/default.jsx):
    /*
    return {
        body: new React4xp('site/pages/default/default')
            .setProps({content})
            .renderEntryToHtml()
    };
    // */

    // works with jsxPath to react4xp-templates standard page:
    /*
    return {
        body: new React4xp('react4xp-templates/Page')
            .setProps({content})
            .renderEntryToHtml()
    };
    // */
};
