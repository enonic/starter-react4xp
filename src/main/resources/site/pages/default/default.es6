/** Simple page controller, as an example of how to render an XP page with Regions, using only server-side React. */

const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

exports.get = function(request) {
    const content = portal.getContent();
    const clientRender = (!content.page.config.SSR) ? "clientRender" : "SSR";
    const req = (content.page.config.req) ? "sending request" : "NO request";

    const entry = portal.getComponent();
    const id = `react4xp_${content._id}`;

    const props = {
        regionsData: content.page.regions,
        names: "main",
        tag: "main",
    };

    const htmlBody = `
                <html>
                    <head>
                        <meta charset="UTF-8" />
                        <title>${content.displayName}</title>
                    </head>
                    <body class="xp-page">
                        <p>View mode: ${request.mode}</p>
                        <p>Page setting: ${clientRender}, ${req}</p>
                        <hr/>
                        <div id="${id}"></div>
                    </body>
                </html>
            `;

    const output = React4xp.render(
        entry,
        props,
        null,
        {
            id,
            body: htmlBody
        }
    );



    // The unclosed !DOCTYPE tag is not XML-compliant, and causes an error if used in the body parameter of React4xp.render.options above.
    // Therefore, added here:
    output.body = '<!DOCTYPE html>' + output.body;

    return output;
};
