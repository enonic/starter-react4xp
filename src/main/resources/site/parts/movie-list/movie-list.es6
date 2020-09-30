const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

const guillotine = require('/headless/guillotineApi')
const { buildQueryListMovies, buildParentPathQuery, extractMovieArray } = require('/headless/helpers/movieListRequests');


exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const sortExpression = `${component.config.sortBy} ${
        component.config.descending ? 'DESC' : 'ASC'
    }`;

    const query = buildQueryListMovies();

    const variables = {
        first: component.config.movieCount,
        offset: 0,
        sort: sortExpression,
        parentPathQuery: buildParentPathQuery(content._path)
    };

    const guillotineResult = guillotine.executeQuery(query, variables);

    const movies = extractMovieArray(guillotineResult);

    return React4xp.render(
        'MovieList',
        {
            movies,
            apiUrl: `./${portal.getSite()._path}/api/headless`,
            parentPath: content._path,
            movieCount: component.config.movieCount,
            sortExpression
        },
        request
        // , { clientRender: true }
    );
};
