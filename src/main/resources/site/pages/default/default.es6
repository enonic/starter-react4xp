/** Simple page controller.
 *  This is an example of a way to render an XP page with Regions, using only server-side React.
 */

const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

exports.get = function() {
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

        // request=null: forcing serverside rendering in all contexts, here preventing an unsupported corner case:
        // Regions (like the ones in default.jsx) can't be client-side rendered if they contain XP components that need their own page contributions to work.
        null,

        {
            id,
            body: `<html><head></head><body class="xp-page"><div id="${id}"></div></body></html>`,
            pageContributions: {
                headBegin: `<title>${content.displayName}</title>`
            }
        }
    );
};

/* ---------------------------
A more performance-focused way, skipping the unnecessary rendering of page contributions:
as long as the rendered react has nothing that needs to be activated in the client, only
the HTML string is needed in this page controller (parts etc inside the regions can still be created any way you want, have their own page controllers and so on).

-----------------------------

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

--------------------------------
 */
