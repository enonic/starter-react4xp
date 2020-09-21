const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');
const React4xp = require('/lib/enonic/react4xp');
const utilLib = require('/lib/util');


exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const sortExpression = `${component.config.sortBy} ${
        component.config.descending ? 'DESC' : 'ASC'
    }`;

    const result = contentLib.getChildren({
        key: content._path,
        start: 0,
        count: component.config.movieCount,
        sort: sortExpression
    });
    log.info("result: " +  JSON.stringify(result, null, 2));

    const hits = result.hits ?
        utilLib.data.forceArray(result.hits) :
        [];

    const movies = hits
        .map( hit => ({
            id: hit._id,
            title: hit.displayName,
            imageUrl: portal.imageUrl({
                id: hit.data.image,
                scale: 'width(300)'
            }),
            description: hit.data.description,
            year: hit.data.year,
            actors: hit.data.actor
                ? utilLib.data.forceArray(hit.data.actor)
                    .map( actor => (actor || '').trim())
                    .filter( actor => !!actor)
                : null
        }));

    log.info("\n----> movies: " +  JSON.stringify(movies, null, 2));

    return React4xp.render(
        'MovieList',
        {
            movies
        },
        request
        , { clientRender: true }
    );
};
