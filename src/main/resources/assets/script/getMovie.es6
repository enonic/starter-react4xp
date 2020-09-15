(() => {



    document.addEventListener("DOMContentLoaded", () => {
        const url = document.getElementById("url").dataset.url;
        const contentId = document.getElementById("contentId").dataset.key;

        fetchMovieData(url, contentId);
    });

// ------------------------------------------------------------------

    const QUERY_GETMOVIE = `query ($key:ID!) {
            guillotine {
                get(key: $key) {
                    displayName
                    ... on com_enonic_app_react4xp_Movie {
                        data {
                            image {
                              ... on media_Image {
                                imageUrl(type:absolute scale:"width(300)")
                              }
                            }
                            year
                            description
                            actor
                        }
                    }
                }
            }
        }`;


    const fetchMovieData = (url, contentId) => {
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                query: QUERY_GETMOVIE,
                variables: {
                    key: contentId,
                }
            }),
            credentials: "same-origin",
        })
            .then(response => response.json())
            .then(result => ({
                imageUrl: result.data.guillotine.get.data.image.imageUrl,
                name: result.data.guillotine.get.displayName,
                year: result.data.guillotine.get.data.year,
                desc: result.data.guillotine.get.data.description,
                actor: result.data.guillotine.get.data.actor
            }))
            .then(createMovie);
    }

// ------------------------------------------------------------------

    const createMovie = params => {
        console.log("createMovie with params(" +
            (Array.isArray(params) ?
                    ("array[" + params.length + "]") :
                    (typeof params + (params && typeof params === 'object' ? (" with keys: " + JSON.stringify(Object.keys(params))) : ""))
            ) + "): " + JSON.stringify(params, null, 2)
        );
    }

})();
