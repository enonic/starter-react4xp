// Minimal example,  client-side-only rendering (renderSafe).
// Inserts simple, hard-coded props to the React component, and
// uses XP component (getComponent) to refer to the React component in the same part folder and with the same name (example.jsx)

const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

// Handle the GET request
exports.get = function(request) {
    const component = portal.getComponent();
    const props = { greetee: "world" };

    // request is used to determine viewing mode. RenderSafe will aim for client-side rendering outside of XP Content Studio's edit mode, and attempt
    // non-hydrated SSR for the edit mode (falling back to a placeholder if SSR fails).
    // Component is used to extrapolate a container/react-component ID and the path to target the jsx file in the same part folder, with the same name.
    return React4xp.renderSafe(request, { component, props });
};
