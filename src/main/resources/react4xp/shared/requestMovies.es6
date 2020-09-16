// Frontend use by react4xp/entries/MovieList.jsx

import doGuillotineRequest from "../../lib/guillotine/guillotineRequest";
import { getListMoviesQuery, extractMovieArray } from "../../lib/movie-listing";

const requestMovies = ({ apiurl, contentid, first, offset, sort, movietype, handleDataFunc }) => {
    doGuillotineRequest({
        url: apiurl,

        query: getListMoviesQuery(movietype),

        variables: {
            contentid,
            first,
            offset,
            sort
        },

        extractDataFunc: extractMovieArray,

        handleDataFunc
    });
};
export default requestMovies;
