const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

exports.get = function(request) {
    const component = portal.getComponent();
    const props = { greetee: component.config.greetee };

    const response = React4xp.render('Hello/hellooo', props, request);

    return response;
};
