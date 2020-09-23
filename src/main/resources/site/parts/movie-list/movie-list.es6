const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

const guillotine = require('/headless/guillotineApi')
const { buildQueryListMovies, extractMovieArray } = require('/headless/helpers/movieListRequests');


exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const sortExpression = `${component.config.sortBy} ${
        component.config.descending ? 'DESC' : 'ASC'
    }`;

    const movieType = `${app.name}:movie`;  // --> "com.enonic.app.react4xp:movie" or similar

    const query = buildQueryListMovies(movieType, content._path);

    const variables = {
        first: component.config.movieCount,
        offset: 0,
        sort: sortExpression
    };

    const guillotineResult = guillotine.executeQuery(query, variables);

    const movies = extractMovieArray(guillotineResult);

    const sitePath = portal.getSite()._path;

    return React4xp.render(
        'MovieList',
        {
            movies,
            apiUrl: `./${sitePath}/api/headless`,
            parentPath: content._path,
            movieCount: component.config.movieCount,
            movieType,
            sortExpression
        },
        request
        // , { clientRender: true }
    );
};
