// THIRD EXAMPLE
//
// The .render function (in the previous examples hello-react and client-render) is just a shorthand method:
// one easy wrapper for the most useful and simple scenario of adding one react entry to one XP part.
//
// This example replaces .render with a more concrete syntax: .renderBody and .renderPageContributions.
//
// They provide more fine-grained control and opportunity for your own logic steps.
// On the downside, there's no automatic rendering mode for certain viewing modes
// - it's recommended to avoid running client-side scripts in edit mode in XP Content Studio, so here we do that manually.
//
// We'll construct a data-holding React4xp object and use it for rendering the body and the necessary page contributions.
//
// Some other optional variations are demonstrated:
// - The id of the target container is injected into a thymeleaf-rendered body,
//      and later react4xp renders the react entry into that target container,
// - The jsxPath now refers to a React component (ColorThing) outside of XP's /site/ structure,
//      in the base directory /react4xp/_entries. 'ColorThing' needs no folder structure, since
//      ColorThing.jsx is at the root of /react4xp/_entries - see the next example for deeper folder locations.

const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');
const thymeleaf = require('/lib/thymeleaf');

const view = resolve('custom-flow.html');



// Handle the GET request
exports.get = function(request) {
    const component = portal.getComponent();

    // Constructor needs one mandatory parameter: an XP component object or, as in this case, a jsxPath. 'ColorThing' is the
    // jsxPath to the entry ColorThing.jsx, since that's at the root level of the react4xp-entries folder
    // (src/main/resources/react4xp/_entries).
    const reactObj = new React4xp('ColorThing');

    // Builder pattern for setting additional optional attributes: react4xp-object setter methods like setProps
    // and uniqueId return reactObj itself so you can chain them like this. Order doesn't matter.
    reactObj
        .setProps({ color: component.config.color })
        .uniqueId();

    // Getting the ID and inserting it into the Thymeleaf model, setting the ID of the target container element.
    const model = {
        targetId: reactObj.react4xpId
    };

    // Render an optional HTML page that the react component will be injected into.
    const preRenderedBody = thymeleaf.render(view, model);

    // Just for demonstration: a page contribution that we add to the react4xp output pageContribution by
    // passing it through .renderPageContributions below.
    const preExistingPageContributions = {
        bodyEnd: `<script>console.log('Okay, rendered the ${reactObj.props.color} thing.');</script>`
    };

    // Rendering a standard XP response object: body and pageContributions separately
    return {

        // .renderBody can be called without any input HTML. If so, it will surround the rendered body with empty placeholder HTML
        body: reactObj.renderBody({
            body: preRenderedBody,
        }),

        // Necessary react-activating scripts through page contributions.
        // We'll skip them if request.mode is 'inline' or 'edit', since that means the page is viewed from inside
        // XP Content Studio and there's a risk that our added scripts would interfere with Content Studio functionality.
        pageContributions: (request.mode === 'live' || request.mode === 'preview') ?
            reactObj.renderPageContributions({
                pageContributions: preExistingPageContributions
            }) :
            undefined
    }
};

// SERVER-SIDE VS CLIENT-SIDE RENDERING:
// Just like the .render method in examples 01 and 02, we control .renderBody and .renderPageContributions with the 'clientRender' parameter.
// In this example, body is rendered on the server-side since we didn't add a 'clientRender' parameter to .renderBody.
// Since we didn't add it to .renderPageContributions either, a .hydrate call is called on the body, in the client.
// The 'clientRender' should match between the two rendering functions:
// If we do add it to .renderBody (and it's true/truthy), only an empty container element with matching ID will be generated to body.
// So we add it to .renderPageContributions, which makes the client call .render instead of hydrate - and the empty container in body is filled with react goodness!
