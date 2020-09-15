const contentLib = require('/lib/xp/content');
const portal = require('/lib/xp/portal');
const util = require('/lib/util');
const React4xp = require('/lib/enonic/react4xp');


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

    const hits = result.total > 0
        ? util.data.forceArray(result.hits.filter( hit => hit.type === `${app.name}:movie`))
        : [];

    const movies = hits.map(hit => ({
        id: hit._id,
        title: hit.displayName,
        imageUrl: hit.data.image ?
            portal.imageUrl({
                id: hit.data.image,
                scale: 'width(300)'
            }) :
            undefined,
        description: portal.processHtml({value: hit.data.description }),
        year: hit.data.year,
        actors:util.data.forceArray( hit.data.actor )
            .map( actor => (actor || '').trim())
            .filter(actor => !!actor)
    }));

    return React4xp.render(
        'MovieList',
        {
            movies,
            apiUrl: `./${content._name}/api/guillotine`,
            parentId: content._id,
            movieCount: component.config.movieCount,
            movieType: `${app.name.replace(/\./g, '_')}_Movie`,
            sortExpression

        },
        request
        // , { clientRender: true }
    );
};
