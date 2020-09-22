// Used by both backend and frontend (the movie-list part controller, and react4xp/entries/MovieList.jsx)

export const buildQueryListMovies = (movieType, parentPath) => {
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
}

// Not using util-lib to ensure usability on frontend
const forceArray = maybeArray => Array.isArray(maybeArray)
    ? maybeArray
    : maybeArray
        ? [maybeArray]
        : [];

export const extractMovieArray = responseData => responseData.data.guillotine.query
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

export default {};
