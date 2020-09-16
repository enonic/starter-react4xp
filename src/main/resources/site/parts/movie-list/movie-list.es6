const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

const guillotine = require('/lib/guillotine/api')
const { getListMoviesQuery, extractMovieArray } = require('/lib/movie-listing');


exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const sortExpression = `${component.config.sortBy} ${
        component.config.descending ? 'DESC' : 'ASC'
    }`;

    const movieType = `${app.name.replace(/\./g, '_')}_Movie`; // --> "com_enonic_app_react4xp_Movie" or similar

    const query = getListMoviesQuery(movieType);

    const variables = {
        contentid: content._id,
        first: component.config.movieCount,
        offset: 0,
        sort: sortExpression
    };

    const guillotineResult = guillotine.executeQuery(query, variables);

    const movies = extractMovieArray(guillotineResult);

    return React4xp.render(
        'MovieList',
        {
            movies,
            apiUrl: `./${content._name}/api/guillotine`,
            parentId: content._id,
            movieCount: component.config.movieCount,
            movieType,
            sortExpression

        },
        request
        // , { clientRender: true }
    );
};
