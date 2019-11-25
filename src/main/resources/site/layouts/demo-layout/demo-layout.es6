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
                                                // <--  Skipping optional 'jsxPath' parameter. Points to a particular JSX entry template. renderLayoutBody falls back to a built-in JSX entry if omitted and there's no same-name JSX file in the folder. See more in the description below.
                containerClass: "demo-layout",  // <--  Add this class to the outer container of the region (in order to get the CSS below to work).
                regionNames: ["right", "left"]  // <--  Add regionNames if you want to control which regions are added, and in which order. They must exist in the xml definition (demo-layout.xml). If the regionNames parameter omitted, all regions are added in the order of appearance in the data object.
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
