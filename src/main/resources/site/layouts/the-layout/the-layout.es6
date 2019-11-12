var portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');
import { renderLayoutBody } from '/lib/enonic/react4xp/templates';

exports.get = function(req) {

    // Find the current component.
    var component = portal.getComponent();

    return { body: renderLayoutBody(component, {jsxPath: 'site/layouts/the-layout/the-layout'}) };


    // Works, with and without layout-local same-name JSX:
    // return { body: renderLayoutBody(component) };


    // Works:
    /*
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
     */
};
