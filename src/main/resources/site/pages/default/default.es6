/** Simple page controller, as an example of how to render an XP page with Regions, using only server-side React.
 */

const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const id = `react4xp_${content._id}`; // Anything unique

    return React4xp.render(

        // component = "this component" -> default.jsx:
        component,

        // default.jsx with these props:
        // use react4xp-regions to select the "main" region from the regions data of the page,
        // and wrap the entered components in a <main> tag.
        {
            regionsData: content.page.regions,
            names: "main",
            tag: "main",
        },

        // request=null: omitting the request object here forces the entry default.jsx to be serverside-rendered and only
        // as an HTML string.
        //
        // The .render `options` argument is still valid: the rendered static HTML is still
        // inserted into the HTML from the added `body`, and `pageContributions` are still added. And of course, parts
        // etc INSIDE the regions can still be created any way you want, use their own page contributions and so on.
        // It's just that .render will not render additional page contributions from THIS particular entry.
        //
        // We take advantage of this here, for two reasons:
        //      - Default.jsx and the Regions in it has no need for page contributions. The way it is now, only the static
        //        HTML is of interest; no client-side JS code needs to be activated/rendered in the client, and there's no
        //        styling or anything else coming from it. So by skipping the page contributions rendering, performance is
        //        improved a little.
        //      - Preventing a currently unsupported corner case: Regions (like the ones in default.jsx) can't be client-side
        //        rendered if they contain XP components that need their own page contributions to work.
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


/**
 Just an optional syntax that would do the same thing:
 ---------------------------

    exports.get = function(request) {
        const content = portal.getContent();
        const component = portal.getComponent();

        const bodyEntry = new React4xp(component);

        bodyEntry.setProps({
            regionsData: content.page.regions,
            names: "main",
            tag: "main",
        });

        return {
            contentType: 'text/html',
            body: `<html><head><title>${
                content.displayName
            }</title></head><body class="xp-page">${
                bodyEntry.renderEntryToHtml()
            }</body></html>`
        };
    };

 --------------------------------
 */
