const portal = require('/lib/xp/portal');

import { renderPageBody } from '/lib/enonic/react4xp/templates';
const React4xp = require('/lib/enonic/react4xp');

// Handle the GET request
exports.get = function(req) {
    // Get the content that is using the page
    const content = portal.getContent();

    return { body: renderPageBody(content) };
};


/* ----------------------------------------------
 HOW THIS WORKS, AND SOME ALTERNATIVES:

 (TL;DR: about the same as the demo layout controller, site/layouts/demo-layout/demo-layout.es6)

 renderPageBody will see if there is a same-folder/same-name entry (here: site/pages/default/default.jsx) and use
 that as a page template if it exists. The react4xp starter comes without one, so renderPageBody just uses a
 generic, standard page template: react4xp-templates/Page.

 You can also add a params argument after 'content' with a 'jsxPath' parameter to point to any JSX entry anywhere,
 e.g: renderPageBody(content, {jsxPath: 'site/somewhere-else/another-page-entry'}) };

 If you want to write your own page entry, you can use the standard Page as example:
 https://github.com/enonic/react4xp-templates/blob/master/src/_entries/react4xp-templates/Page.jsx
 It should import and use a <RegionRange>, which automatically populates the page with the regions defined in
 default.xml, and populates the regions with the content dropped into it.

 You can also use React4xp directly without the renderPageBody wrapper, with the jsxPath to your page entry:

 const React4xp = require('/lib/enonic/react4xp');

 (...)

 return {
    body: new React4xp('site/somewhere-else/another-page-entry')
        .setProps({content})
        .renderEntryToHtml()
 };

---------------------------------------------- */
