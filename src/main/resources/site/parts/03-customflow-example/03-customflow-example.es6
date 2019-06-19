// .render / .renderSafe are just shorthand methods. This example replaces them with a more explicit syntax.
// This syntax provides more fine-grained control and opportunity for logic steps when creating the React component.
// We'll construct a data-holding React4xp object (reactComp) and use it for rendering the body and the necessary page contributions.
// Other variations:
// - The id of the target container is inserted into the body with thymeleaf
// - The jsxPath now refers to a React component (BlueGreeter) outside of XP's /site/ structure, in the base directory /react4xp/_entries.

const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');
const thymeleaf = require('/lib/thymeleaf');

const TARGET_ID = "blue-greeter-target-id";
const view = resolve('03-customflow-example.html');
const model = {
    targetId: TARGET_ID
};
const PRE_RENDERED_BODY_TEMPLATE = thymeleaf.render(view, model);

// Handle the GET request
exports.get = function(request) {
    const component = portal.getComponent();

    // Constructor for setting a mandatory parameter: an XP component object, or as in this case: a jsxPath.
    const reactComp = new React4xp('BlueGreeter');

    // Builder pattern for setting additional optional attributes
    reactComp
        .setId(TARGET_ID)
        .setProps({
            greetee: component.config.greetee
        });

    const preExistingPageContributions = {
        bodyEnd: '<script>console.log("Example 03 is complete.");</script>'
    };

    return {
        // .renderTargetContainer can be used without a (PRE_RENDERED_BODY_TEMPLATE) parameter. It will then simply create an empty target container for you.
        body: reactComp.renderTargetContainer(PRE_RENDERED_BODY_TEMPLATE),

        // .renderClientPageContributions can be used without a (preExistingPageContributions) parameter.
        // Used like this, however, the necessary scripts for making the react component render and work, are ADDED to the preexisting ones.
        pageContributions: reactComp.renderClientPageContributions(preExistingPageContributions)
    }
};
