// Variations of 01-minimal-example:
// - React server-side rendering (.render instead of .renderSafe)...
// - ...into a chosen container element (#serverside-example-container) that's already in a thymeleaf template (02-serverside-example.html)...
// - ...using a jsxPath (see the docs) to refer to a React component from another XP part (01-minimal-example/01-minimal-example.jsx)...
// - ...and uses props to insert XP editorial data from the part's config (what comes after "Hello") into the React component.

const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');
const thymeleaf = require('/lib/thymeleaf');

const view = resolve('02-serverside-example.html');

// Handle the GET request
exports.get = function(request) {
    const component = portal.getComponent();

    // Request is still used to determine viewing mode. But .render
    return React4xp.render(
        request,
        {
            props: { greetee: component.config.greetee },
            // Worth noting: since we're manually setting the id and jsxPath parameter, we don't need the
            // component parameter here, compared to 01-minimal-example - getComponent() is only used for the props here.
            jsxPath: 'site/parts/01-minimal-example/01-minimal-example',
            id: 'serverside-example-container',
            body: thymeleaf.render(view, {})
        });
};
