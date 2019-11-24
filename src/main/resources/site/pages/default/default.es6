const portal = require('/lib/xp/portal');

import { renderPageBody } from '/lib/enonic/react4xp/templates';

// Handle the GET request
exports.get = function(req) {
    // Get the content that is using the page
    const content = portal.getContent();

    return {
        body: renderPageBody(
            content,
            {
                jsxPath: 'site/pages/default/default',
                regionNames: ["main"]  // <-- Add regionNames if you need to control which regions are added, or in which order. They must exist in the xml definition (default.xml). If omitted, all regions are added, in the order of appearance in the data object.
            }
        )
    };
};


/* ----------------------------------------------
TEMPLATES USAGE AND ALTERNATIVES:

The parameter jsxPath points to default.jsx in this folder. This could actually be omitted, since renderPageBody falls back
to looking for a same-name JSX in the same folder if it's not given a jsxPath parameter (and if there was no default.jsx
either, it would fall back to using the generic react4xp-templates/Page - see
https://github.com/enonic/react4xp-templates/blob/master/src/_entries/react4xp-templates/Page.jsx).

You can also add a props parameter if you want: renderPageBody(content, { props })

If you don't want to use the renderPageBody shortcut function from lib-react v0.3.10+, this syntax is equivalent:

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
