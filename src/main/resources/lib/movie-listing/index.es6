// Used by both backend and frontend (the movie-list part controller, and react4xp/shared/requestMovies.es6)

export const getListMoviesQuery = movieType => `
query($contentid:ID!, $first:Int!, $offset:Int!, $sort:String!) {
    guillotine {
        getChildren(key: $contentid, first: $first, offset: $offset, sort: $sort) {
            ... on ${movieType} {
                _id,
                displayName
                data {
                    year
                    description
                    actor
                    image {
                        ... on media_Image {
                            imageUrl(type:absolute scale:"width(300)")
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

export const extractMovieArray = responseData => responseData.data.guillotine.getChildren
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
