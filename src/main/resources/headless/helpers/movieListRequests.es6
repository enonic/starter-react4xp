// Used by both backend and frontend (the movie-list part controller, and react4xp/entries/MovieList.jsx)

export const buildParentPathQuery = (parentPath) => `_parentPath = '/content${parentPath}'`;

export const buildQueryListMovies = () => `
query($first:Int!, $offset:Int!, $sort:String!, $parentPathQuery:String!) {
  guillotine {
    query(contentTypes: ["com.enonic.app.react4xp:movie"], query: $parentPathQuery, first: $first, offset: $offset, sort: $sort) {
      ... on com_enonic_app_react4xp_Movie {
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
