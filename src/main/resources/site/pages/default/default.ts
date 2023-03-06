/** Simple page controller, as an example of how to render an XP page with Regions, using only server-side React.
 *
 *  NOTE:   Parts and layouts rendered with react4xp DO NOT need a page controller like this to work. Putting react4xp-
 *          rendered XP components inside regions in a thymeleaf-rendered page controller (or hardcoded, etc) is
 *          perfectly fine. This is just a demo of how to do it if you need to make the page controller in react4xp.
 */

import {
    getComponent,
    getContent,
} from '/lib/xp/portal';
import {render} from '/lib/enonic/react4xp';

export function get(request) {
    const content = getContent();
    const entry = getComponent();


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
                        <div id="${id}"></div>
                    </body>
                </html>
            `;

    const output = render(
        entry,
        props,
        null,
        {
            id,
            body: htmlBody//,
            //clientRender: true // Doesn't work for page
        }
    );



    // The unclosed !DOCTYPE tag is not XML-compliant, and causes an error if used in the body parameter of React4xp.render.options above.
    // Therefore, added here:
    output.body = '<!DOCTYPE html>' + output.body;

    return output;
}
