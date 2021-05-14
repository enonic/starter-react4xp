const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

exports.get = function(request) {

    //log.info("\n\n000000000000000000000000000000000000000000000000000000000000\n\n\n\n\nGET SINGLE MOVIE: " + request.path + "\n\n\n");

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
        actors: (Array.isArray( content.data.actor )
            ? content.data.actor
            : content.data.actor ? [content.data.actor] : [])
            .map( actor => (actor || '').trim())
            .filter(actor => !!actor)
    }

    return React4xp.render(
        'Movie',
        props,
        request
        // , { clientRender: true }
    );
};
