const portal = require('/lib/xp/portal');

import { renderPageBody } from '/lib/enonic/react4xp/templates';

// Handle the GET request
exports.get = function(req) {
    // Get the content that is using the page
    const content = portal.getContent();

    const body = renderPageBody(content );

    return {
        body //: renderPageBody(content) }
    };
};
