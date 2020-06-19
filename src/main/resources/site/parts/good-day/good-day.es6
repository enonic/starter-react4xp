const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

exports.get = function(request) {

    const component = portal.getComponent();

    const props = {
        message: "G'day",
        messageReceiver: component.config.greetee
    };

    return React4xp.render(
        "site/parts/good-day/different-greeting",
        props,
        request,
        {
            clientRender: true
        });
};
