var portal = require('/lib/xp/portal');
import { renderLayoutBody } from '/lib/enonic/react4xp/templates';

exports.get = function(req) {

    // Get data from the current component (this layout).
    var component = portal.getComponent();

    return {

        // Since there isn't any same-name-as-layout JSX file (site/layouts/demo-layout/demo-layout.jsx) located in the same folder,
        // and renderLayoutBody isn't given a jsxPath parameter either, .renderLayoutBody() falls back to using the generic JSX-template
        // from react4xp-templates is used for the layout:
        // https://github.com/enonic/react4xp-templates/blob/master/src/_entries/react4xp-templates/Layout.jsx
        // It populates the regions defined in demo-layout.xml with the XP components that are dropped into them.
        body: renderLayoutBody(component, {
                props: {
                    containerClass: "demo-layout",
                    regionNames: ["right", "left"]  // <-- Add regionNames if you want to control which regions are added, and in which order. They must exist in the xml definition (demo-layout.xml). If omitted, all regions are added, in the order of appearance in the data object.
                }
            }),

        // Making the two regions into two columns:
        pageContributions: {
            headEnd: `
                <style>
                    .demo-layout {
                        margin-top: 20px;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        justify-content: space-between;
                    }

                    /* Both left and right region will be given the class "xp-region" by XP, while ".demo-layout" stems from demo-layout.jsx  */
                    .demo-layout .xp-region {
                        width: 45%;
                    }
                </style>
`
        }
    };
};


/* ----------------------------------------------
 TEMPLATE USAGE AND ALTERNATIVES:

 (TL;DR: about the same as the page controller, site/pages/default/default.es6)

 The line

     renderLayoutBody(component)

 makes renderLayoutBody look for is actually shorthand syntax for:

     renderLayoutBody(component, {jsxPath: 'site/layouts/dempo-layout/demo-layout'})

 ...since renderLayoutBody automatically looks for a same-name-same-folder JSX entry if it doesn't get a jsxPath.

 But since there isn't a demo-layout.jsx in this folder, and no other jsxPath is supplied either,
 renderLayoutBody falls back to using a standard generic layout tamplate: "react4xp-templates/Layout".

 (https://github.com/enonic/react4xp-templates/blob/master/src/_entries/react4xp-templates/Layout.jsx)

 If you want, you can use that generic layout (react4xp-templates/Layout) directly, without the renderLayoutBody wrapper:

 const React4xp = require('/lib/enonic/react4xp');

 (...)

 return {
         body: new React4xp('react4xp-templates/Layout')
             .setProps({
                 component,
                 containerClass: "row",
                 classesByName: {
                     left: "col-sm-7",
                     right: "col-sm-5"
                 }
             })
             .renderEntryToHtml()
     };

 This would have wrapped the regions in a div with the class "row", and added the class "col-sm-7" to the "left" region
 defined in demo-layout.xml, etc.

---------------------------------------------- */
