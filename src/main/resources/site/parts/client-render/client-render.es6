// SECOND EXAMPLE
//
// Differences from hello-react:
// - Adds optional parameters (the 'params' argument)
// - React client-side-only rendering (the 'clientRender' parameter)...
// - ...into a chosen container element (#serverside-example-container) that's already in a thymeleaf template (client-render.html)...
// - ...using a jsxPath (see the docs) to refer to a React component from another XP part (hello-react/hello-react.jsx)...
// - ...and uses props to insert XP editorial data from the part's config (what comes after "Hello") into the React component.

const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');
const thymeleaf = require('/lib/thymeleaf');

const view = resolve('client-render.html');

exports.get = function(request) {
    const component = portal.getComponent();

    const jsxPath = 'site/parts/hello-react/hello-react';
    const props = {
        greetee: component.config.greetee
    };
    const params = {
        // Render into the container element with this ID (hardcoded here and in the .html view only for demonstration)...
        id: 'second-example-container',
        // ...that exists in this body...
        body: thymeleaf.render(view, {}),
        // ...only on the client-side (skip serverside rendering and hydration):
        clientRender: true,
    };

    return React4xp.render(jsxPath, props, request, params);
};
