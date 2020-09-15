import doGuillotineRequest from '../../guillotine/guillotineRequest';

(() => {
    document.addEventListener("DOMContentLoaded", () => {

        // Read the constants from the data- attributes in the show-movies-constants element set in site/parts/show-movies/show-movies.js
        const constants = document.getElementById("show-movies-constants");
        const { apiurl, contentid, first, offset, sortby, contenttype } = constants.dataset;

        doGuillotineRequest({
            url: apiurl,

            query: `
                query($key:ID!, $first:Int!, $offset:Int!, $sort:String!) {
                    guillotine {
                        getChildren(key: $key, first: $first, offset: $offset, sort: $sort) {
                            ... on ${contenttype} {
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
                }`,

            variables: {
                key: contentid,
                first,
                offset,
                sort: sortby
            },

            extractDataFunc: responseData => responseData.data.guillotine.getChildren
                .filter( movieItem => movieItem && typeof movieItem === 'object' && Object.keys(movieItem).indexOf("data") !== -1)
                .map(
                    movieItem => ({
                        name: movieItem.displayName,
                        imageUrl: movieItem.data.image.imageUrl,
                        year: movieItem.data.year,
                        desc: movieItem.data.description,
                        actor: movieItem.data.actor
                    })
                ),

            handleDataFunc: movies => {
                movies.forEach( movie => { console.log(movie); });
            }
        })
    });
})();


TODO: hvordan strukturere koden? Jeg vil at doGuillotineRequest skal kunne brukes både fra entries og kontrollere (som pageContribution). Men fra kontrollere skjer dette: Uncaught ReferenceError: require is not defined
