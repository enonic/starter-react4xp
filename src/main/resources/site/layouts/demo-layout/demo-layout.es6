var portal = require('/lib/xp/portal');
import { renderLayoutBody } from '/lib/enonic/react4xp/templates';

exports.get = function(req) {

    // Get data from the current component (this layout).
    var component = portal.getComponent();

    return {

        // renderLayoutBody API and usage:
        //      https://github.com/enonic/lib-react4xp/blob/master/src/main/resources/lib/enonic/react4xp/templates.es6
        //      https://github.com/enonic/react4xp-templates/blob/master/src/_entries/react4xp-templates/Layout.jsx
        body: renderLayoutBody({
                component,                      // <--  Basic data
                                                // <--  Skipping optional 'jsxPath' parameter, just using the built-in bare-bone JSX entry Layout.jsx (see link above).
                containerClass: "demo-layout",  // <--  Optional: Add this class to the outer container of the region (in order to get the CSS below to work).
                regionNames: ["left", "right"]  // <--  Optional: Add regionNames if you want to control which regions are added, in that order. They must exist in the xml definition (demo-layout.xml). If the regionNames parameter omitted, all regions are added in the order of appearance in the data object.
            }),

        // Add some pageContributions to make the two regions into two columns:
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

/*
Think of the params argument to renderLayoutBody as the props that are passed to the JSX entry chosen by jsxPath
(except the jsxPath param itself) - although in this case we skipped jsxPath anyway in order to use the built-in Layout.jsx.

Layout.jsx (see the link above) also takes some other optional props we could have added here - containerTag and regionClasses:


renderLayoutBody({
    component,                      // <--  Basic data

    containerTag: "main",           // <--  Optional: makes the HTML element containing the layout a <main> tag instead of the default <div>.

    regionClasses: {                // <--  Optional: Add specific classes to specific regions (object like this), a common class to all regions (string instead of object), or the renderLayoutBody-default: each region gets its own name as class (the boolean true).
        left: "left-region",
        right:, "right-region"
    }
}),

 */
