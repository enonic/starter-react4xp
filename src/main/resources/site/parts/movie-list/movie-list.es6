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

    log.info("\n--------\nBuilt query:" + query);

    const variables = {
        contentid: content._id,
        first: component.config.movieCount,
        offset: 0,
        sort: sortExpression
    };

    log.info("\nVariables:" + JSON.stringify(variables, null, 4));

    const guillotineResult = guillotine.executeQuery(query, variables);

    log.info("\nguillotineResult: " + JSON.stringify(guillotineResult, null, 4));

    const movies = extractMovieArray(guillotineResult);

    log.info("\n--------->\nextracted movie array: " + JSON.stringify(movies, null, 4));

    return React4xp.render(
        'MovieList',
        {
            movies,
        },
        request
        // , { clientRender: true }
    );
};
