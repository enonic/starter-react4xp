var portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');
import { renderLayoutBody } from '/lib/enonic/react4xp/templates';

exports.get = function(req) {

    // Get data from the current component (this layout).
    var component = portal.getComponent();

    return {

        // Since a same-name-as-layout JSX file is located in the same folder (site/layouts/demo-layout/demo-layout.jsx),
        // it's automatically selected as the react template for the layout.
        // It populates the regions defined in demo-layout.xml with the XP components that are dropped into them.
        body: renderLayoutBody(component),


        // Making it two columns (outside the scope of demonstrating a react layout, but looks prettier):
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



// SOME LAYOUT ALTERNATIVES:

// If you want to point to a different JSX, use the jsxPath in the following syntax for renderLayoutBody:
// renderLayoutBody(component, {jsxPath: 'site/somewhere-else/another-template'})

// If there hadn't been a demo-layout.jsx in this folder, and no other jsxPath was supplied either,
// renderLayoutBody would have fallen back to using a standard layout: react4xp-templates/Layout.

// You can also use the standard layout (react4xp-templates/Layout) directly without renderLayoutBody, for example:

// const React4xp = require('/lib/enonic/react4xp');
//
// (...)
//
// return {
//         body: new React4xp('react4xp-templates/Layout')
//             .setProps({
//                 component,
//                 containerClass: "row",
//                 classesByName: {
//                     left: "col-sm-7",
//                     right: "col-sm-5"
//                 }
//             })
//             .renderEntryToHtml()
//     };
//
// This would have wrapped the regions in a div with the class "row", and added the class "col-sm-7" to the "left" region
// defined in demo-layout.xml, etc.
