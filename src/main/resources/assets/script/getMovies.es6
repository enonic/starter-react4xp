(() => {



    document.addEventListener("DOMContentLoaded", () => {
        // Read the constants from the data- attributes in the show-movies-constants element set in site/parts/show-movies/show-movies.js
        const constants = document.getElementById("show-movies-constants");
        const { apiurl, contentid, first, offset, sortby, contenttype } = constants.dataset;

        fetchMovieData(apiurl, contentid, first, offset, sortby, contenttype);
    });

// ------------------------------------------------------------------


    const getQueryForMovieChildren = type => `
    query($key:ID!, $first:Int!, $offset:Int!, $sort:String!) {
        guillotine {
            getChildren(key: $key, first: $first, offset: $offset, sort: $sort) {
                ... on ${type} {
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

    const fetchMovieData = (url, key, first, offset, sort, type) => {
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                query: getQueryForMovieChildren(type),
                variables: {
                    key,
                    first,
                    offset,
                    sort
                }
            }),
            credentials: "same-origin",
        })
            .then(response => {
                if (!(response.status < 300)) {
                    throw Error(`Guillotine API response:\n\n${response.status} - ${response.statusText}.\n\nAPI url: ${response.url}\n\nInspect the request and/or the server log.`);
                }
                return response;
            })
            .then(response => response.json())
            .then(data => data.data.guillotine.getChildren
                .filter( movieItem => movieItem && typeof movieItem === 'object' && Object.keys(movieItem).indexOf("data") !== -1)
                .map(
                    movieItem => ({
                        name: movieItem.displayName,
                        imageUrl: movieItem.data.image.imageUrl,
                        year: movieItem.data.year,
                        desc: movieItem.data.description,
                        actor: movieItem.data.actor
                    })
            ))
            .then(addMovies)
            .catch(error => {
                console.error(error);
            })
    }

// ------------------------------------------------------------------

    const addMovies = movies => {
        movies.forEach( movie => { console.log(movie); });
    }

})();
