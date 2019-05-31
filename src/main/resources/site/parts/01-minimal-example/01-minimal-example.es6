// Minimal example,  client-side-only rendering (renderSafe).
// Inserts simple, hard-coded props to the React component, and
// uses XP component (getComponent) to refer to the React component in the same part folder and with the same name (example.jsx)

const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

// Handle the GET request
exports.get = function(request) {
    const component = portal.getComponent();
    const props = { greetee: "world" };

    // request is used to determine viewing mode
    return React4xp.renderSafe(request, { component, props });
};
