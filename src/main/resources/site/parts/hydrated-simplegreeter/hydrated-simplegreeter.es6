// Server-side rendered independent react component src/main/react4xp/_entries/SimpleGreeter.jsx

const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

// Handle the GET request
exports.get = function(request) {
    const component = portal.getComponent();
    const props = { greetee: component.config.greetee };

    return React4xp.render(
        request,
        {
            component,
            props,
            jsxPath: "SimpleGreeter",
        },
    );
};
