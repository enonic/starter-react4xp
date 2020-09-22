// Used by both backend and frontend (the movie-list part controller, and react4xp/entries/MovieList.jsx)

export const buildQueryListMovies = () => {
    return `
        query {
          guillotine {
            query(contentTypes: ["com.enonic.app.react4xp:movie"], query: "_parentPath = '/content/moviesite'", first: 3, offset: 0, sort: "displayName ASC") {
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
}

export default {};
