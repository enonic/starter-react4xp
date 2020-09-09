const portal = require('/lib/xp/portal');
const util = require('/lib/util');
const React4xp = require('/lib/enonic/react4xp');


exports.get = function(request) {
    const content = portal.getContent();
    const props = {
        imageUrl: content.data.image ?
            portal.imageUrl({
                id: content.data.image,
                scale: 'width(300)'
            }) :
            undefined,
        title: content.displayName,
        description: portal.processHtml({value: content.data.description }),
        year: content.data.year,
        actors: util.data.forceArray( content.data.actor )
            .map( actor => (actor || '').trim())
            .filter(actor => !!actor)
    }

    log.info("props (" +
    	(Array.isArray(props) ?
    		("array[" + props.length + "]") :
    		(typeof props + (props && typeof props === 'object' ? (" with keys: " + JSON.stringify(Object.keys(props))) : ""))
    	) + "): " + JSON.stringify(props, null, 2)
    );

    return React4xp.render(
        'Movie',
        props,
        request
        // , { clientRender: true }
    );
};
