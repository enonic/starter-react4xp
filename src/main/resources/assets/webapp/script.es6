const buildQueryListMovies = (movieType, parentPath) => {
    const matched = movieType.match(/(\w+(\.\w+)*):(\w+)/i);  // verifies content type names like "com.enonic.app.react4xp:movie" and matches up groups before and after the colon
    if (!matched) {
        throw Error(`movieType '${movieType}' is not a valid format. Expecting <appName>:<XP content type>, for example: 'com.enonic.app.react4xp:movie' etc`);
    }
    const appNameUnderscored = matched[1].replace(/\./g, '_');      // e.g. "com.enonic.app.react4xp" --> "com_enonic_app_react4xp
    const ctyCapitalized = matched[3][0].toUpperCase() + matched[3].substr(1);       // e.g. "movie" --> "Movie"

    return `
query($first:Int!, $offset:Int!, $sort:String!) {
  guillotine {
    query(contentTypes: ["${movieType}"], query: "_parentPath = '/content${parentPath}'", first: $first, offset: $offset, sort: $sort) {
      ... on ${appNameUnderscored}_${ctyCapitalized} {
        _id
        displayName
        data {
          year
          description
          actor
          image {
            ... on media_Image {
              imageUrl(type: absolute, scale: "width(300)")
            }
          }
        }
      }
    }
  }
}`;
};

// Not using util-lib to ensure usability on frontend
const forceArray = maybeArray => Array.isArray(maybeArray)
    ? maybeArray
    : maybeArray
        ? [maybeArray]
        : [];


const extractMovieArray = responseData => responseData.data.guillotine.query
    .filter( movieItem => movieItem && typeof movieItem === 'object' && Object.keys(movieItem).indexOf('data') !== -1)
    .map(
        movieItem => ({
            id: movieItem._id,
            title: movieItem.displayName.trim(),
            imageUrl: movieItem.data.image.imageUrl,
            year: movieItem.data.year,
            description: movieItem.data.description,
            actors: forceArray(movieItem.data.actor)
                .map( actor => (actor || '').trim())
                .filter(actor => !!actor)
        })
    );


// ---------------------------------------------------------

// Makes a (guillotine) request for data with these search parameters and passes updateDOMWithNewMovies as the callback
// function to use on the returned list of movie data
const requestAndRenderMovies = () => {
    fetch(
        MOVIE_LIST_PARAMS.apiUrl,
        {
            method: "POST",
            body: JSON.stringify({
                query: buildQueryListMovies(
                    MOVIE_LIST_PARAMS.movieType,
                    MOVIE_LIST_PARAMS.parentPath
                ),
                variables: {
                    first: MOVIE_LIST_PARAMS.movieCount,
                    offset: 0,
                    sort: MOVIE_LIST_PARAMS.sortExpression
                }}
            ),
        }
    )
        .then(response => {
            if (!(response.status < 300)) {
                throw Error(`Guillotine API response:\n
                \n${response.status} - ${response.statusText}.\n
                \nAPI url: ${response.url}\n
                \nInspect the request and/or the server log.`);
            }
            return response;
        })

        .then(response => response.json())
        .then(extractMovieArray)
        .then(renderMovies)
        .catch( error => {console.error(error);})
};




const renderMovies = (movies) => {
    console.log("Rendering initial movies:", movies);

    // When compiled, all react4xp entries are exported as functions,
    // as "default" under the entryName (jsxPath), inside the global object React4xp:
    const componentFunc = React4xp['MovieList'].default;

    // Run the componentFunc with the props as argument, to build a renderable react component:
    const props = {
        movies: movies,
        apiUrl: MOVIE_LIST_PARAMS.apiUrl,
        parentPath: MOVIE_LIST_PARAMS.parentPath,
        movieCount: MOVIE_LIST_PARAMS.movieCount,
        movieType: MOVIE_LIST_PARAMS.movieType,
        sortExpression: MOVIE_LIST_PARAMS.sortExpression
    };
    const component = componentFunc(props);

    // Get the DOM element where the movie list should be rendered:
    const targetElement = document.getElementById("movieListContainer");

    // Straight call to ReactDOM (loaded from CDN):
    ReactDOM.render(component, targetElement);
};

requestAndRenderMovies();
