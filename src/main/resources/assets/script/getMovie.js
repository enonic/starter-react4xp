document.addEventListener("DOMContentLoaded", () => {
    const query = `query ($key:ID!) {
            guillotine {
                get(key: $key) {
                    displayName
                    ... on com_enonic_app_react4xp_Movie {
                        data {
                            image
                            year
                            description
                        }
                    }
                }
            }
        }`;

    const getImageUrl = `query ($key:ID!) {
            guillotine {
                get(key: $key) {
                    ... on media_Image {
                        imageUrl(scale: "width(500)", type:absolute)
                    }
                }
            }
        }`;

    /* data {
        ... on image {
            imageUrl(scale:"width(400)", type:absolute)
        }
        year
        description
    } */
    let url = document.getElementById("url").dataset.url;
    let content = document.getElementById("content").dataset.key;

    const variables = {
        key: content,
    };

    const body = {
        query: query,
        variables: variables,
    };

    console.log(JSON.stringify(body, null, 4));

    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            query: query,
            variables: variables,
        }),
        credentials: "same-origin",
    })
    .then((response) => response.json())
    .then((response) => {
        getImage(response);
    });

    function getImage(result) {
        let imageId = result.data.guillotine.get.data.image;
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                query: getImageUrl,
                variables: {
                    key: imageId
                },
            }),
            credentials: "same-origin"
        })
        .then((response) => response.json())
        .then((response) => {
            let imageUrl = response.data.guillotine.get.imageUrl;
            //result
            let name = result.data.guillotine.get.displayName;
            let year = result.data.guillotine.get.data.year;
            let desc = result.data.guillotine.get.data.description;

            createMovie({
                name,
                year,
                imageUrl,
                desc,
            })
        });

        return result;
    }

    function createMovie(params) {
        let name = params.headline;
        let year = params.year;
        let coverUrl = params.imageUrl;
        let description = params.desc;

        let movie = document.getElementById("movie");
        let h = document.createElement("h1");
        h.textContent = name;
        let img = document.createElement("img");
        img.setAttribute("src", coverUrl);
        let p = document.createElement("p");
        p.textContent = year;
        let p2 = document.createElement("p");
        p2.textContent = description;
        
        movie.appendChild(h);
        movie.appendChild(img);
        movie.appendChild(p);
        movie.appendChild(p2);

    }
});
