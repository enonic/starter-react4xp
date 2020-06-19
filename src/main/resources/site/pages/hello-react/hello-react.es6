const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');


exports.get = function(request) {
    const entry = portal.getComponent();

    const content = portal.getContent();
    const pageConfig = (content.page || {}).config || {};
    const props = {
        message: pageConfig.greeting,
        messageTarget: pageConfig.greetee,
        droppableThing: pageConfig.things,
        initialCount: pageConfig.startCount
    };

    log.info("props (" +
    	(Array.isArray(props) ?
    		("array[" + props.length + "]") :
    		(typeof props + (props && typeof props === 'object' ? (" with keys: " + JSON.stringify(Object.keys(props))) : ""))
    	) + "): " + JSON.stringify(props, null, 2)
    );

    return React4xp.render(
        entry,
        props,
        request,
        {
            id: "react4xpApp",
            body: `
                <html>
                    <head></head>
                    <body class="xp-page">
                        <div id="react4xpApp"></div>
                    </body>
                </html>
            `
        }
    )
};
