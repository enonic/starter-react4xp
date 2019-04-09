// Simple client-side-rendered (renderSafe) example from local react component: example.jsx

const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

// Handle the GET request
exports.get = function(request) {
    const component = portal.getComponent();
    const props = { greetee: component.config.greetee };

    return React4xp.renderSafe(request, { component, props });
};
