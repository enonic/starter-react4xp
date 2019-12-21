const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

exports.get = function(request) {
    const component = portal.getComponent();
    const props = { greetee: component.config.greetee };

    const response = React4xp.render(component, props, request, {clientRender: true});

    log.info("hello2 response (" +
    	(Array.isArray(response) ?
    		("array[" + response.length + "]") :
    		(typeof response + (response && typeof response === 'object' ? (" with keys: " + JSON.stringify(Object.keys(response))) : ""))
    	) + "): " + JSON.stringify(response, null, 2)
    );

    return response;
};
