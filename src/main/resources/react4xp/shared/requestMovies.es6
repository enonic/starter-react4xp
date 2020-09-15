import doGuillotineRequest from "../../guillotine/guillotineRequest";

const requestMovies = ({ apiurl, contentid, first, offset, sort, movietype, handleDataFunc }) => {
    doGuillotineRequest({
        url: apiurl,

        query: `
            query($contentid:ID!, $first:Int!, $offset:Int!, $sort:String!) {
                guillotine {
                    getChildren(key: $contentid, first: $first, offset: $offset, sort: $sort) {
                        ... on ${movietype} {
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
            }`,

        variables: {
            contentid,
            first,
            offset,
            sort
        },

        extractDataFunc: responseData => responseData.data.guillotine.getChildren
            .filter( movieItem => movieItem && typeof movieItem === 'object' && Object.keys(movieItem).indexOf('data') !== -1)
            .map(
                movieItem => ({
                    id: movieItem._id,
                    name: movieItem.displayName,
                    imageUrl: movieItem.data.image.imageUrl,
                    year: movieItem.data.year,
                    desc: movieItem.data.description,
                    actor: movieItem.data.actor
                })
            ),

        handleDataFunc
    });
};
export default requestMovies;
