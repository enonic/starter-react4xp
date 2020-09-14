(() => {

    const QUERY_GETMOVIE = `query ($key:ID!) {
            guillotine {
                get(key: $key) {
                    displayName
                    ... on com_enonic_app_react4xp_Movie {
                        data {
                            image {
                                _id
                            }
                            year
                            description
                            actor
                        }
                    }
                }
            }
        }`;

    const QUERY_GETIMAGEURL = `query ($key:ID!) {
            guillotine {
                get(key: $key) {
                    ... on media_Image {
                        imageUrl(scale: "width(500)", type:absolute)
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
            .then(getImage(url));
    }


    const getImage = url => result => {
        let imageId = result.data.guillotine.get.data.image._id;
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                query: QUERY_GETIMAGEURL,
                variables: {
                    key: imageId
                },
            }),
            credentials: "same-origin"
        })
            .then(response => response.json())
            .then(response => ({
                    imageUrl: response.data.guillotine.get.imageUrl,
                    name: result.data.guillotine.get.displayName,
                    year: result.data.guillotine.get.data.year,
                    desc: result.data.guillotine.get.data.description,
                    actor: result.data.guillotine.get.data.actor
                })
            )
            .then(createMovie);

        return result;
    };


    const createMovie = params => {
        console.log("createMovie with params(" +
            (Array.isArray(params) ?
                    ("array[" + params.length + "]") :
                    (typeof params + (params && typeof params === 'object' ? (" with keys: " + JSON.stringify(Object.keys(params))) : ""))
            ) + "): " + JSON.stringify(params, null, 2)
        );
    }


// ------------------------------------------------------------------

    document.addEventListener("DOMContentLoaded", () => {
        const url = document.getElementById("url").dataset.url;
        const contentId = document.getElementById("contentId").dataset.key;

        fetchMovieData(url, contentId);
    });

})();
