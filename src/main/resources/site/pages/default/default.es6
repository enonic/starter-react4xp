/** Simple page controller, as an example of how to render an XP page with Regions, using only server-side React.
 *
 *  NOTE:   Parts and layouts rendered with react4xp DO NOT need a page controller like this to work. Putting react4xp-
 *          rendered XP components inside regions in a thymeleaf-rendered page controller (or hardcoded, etc) is
 *          perfectly fine. This is just a demo of how to do it if you need to make the page controller in react4xp.
 */

const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

exports.get = function(request) {
    const content = portal.getContent();
    const entry = portal.getComponent();

    const clientRender = (!content.page.config.SSR) ? "clientRender" : "SSR";
    const req = (content.page.config.req) ? "sending request" : "NO request";

    const otherModeLink = request.mode === 'preview'
        ? ` <span class="modeswitch">(go to <a href="/site/default/master/${content._name}">Live</a> view)</span>`
        : request.mode === 'live'
            ? ` <span class="modeswitch">(go to <a href="/admin/site/preview/default/draft/${content._name}">Preview</a>)</span>`
            : '';

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
                        <p>View mode: <strong>${request.mode}</strong>${otherModeLink}</p>
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
