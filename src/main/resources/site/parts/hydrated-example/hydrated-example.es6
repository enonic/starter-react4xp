// Server-side rendered react component from another XP part: example/example.jsx

const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

// Handle the GET request
exports.get = function(request) {
    const component = portal.getComponent();

    return React4xp.render(
        request,
        {
            component,
            props: { greetee: component.config.greetee },
            jsxPath: 'site/parts/example/example',
        });
};
