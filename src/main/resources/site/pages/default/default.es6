const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

// Handle the GET request
exports.get = function(req) {
    // Get the content that is using the page
    const content = portal.getContent();

    const mainRegion = new React4xp('site/pages/default/xpRegion')
        .setProps({
            name: 'main',
            content
        })
    const body = mainRegion.renderEntryToHtml(); // SSR always! Is it possible to use JSX that needs client-rendering in this?

    // Return the response object
    return { body };
};
