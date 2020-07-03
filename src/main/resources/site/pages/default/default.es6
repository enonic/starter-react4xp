/** Simple page controller, as an example of how to render an XP page with Regions, using only server-side React. */

const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

exports.get = function(request) {
    const content = portal.getContent();
    const entry = portal.getComponent();

    const id = `react4xp_${content._id}`;

    const props = {
        regionsData: content.page.regions,
        names: "main",
        tag: "main",
    };

    return React4xp.render(
        entry,
        props,
        null,
        {
            id,
            body: `
                <html>
                    <head>
                        <title>${content.displayName}</title>
                    </head>
                    <body class="xp-page">
                        <div id="${id}"></div>
                    </body>
                </html>
            `
        }
    );
};
