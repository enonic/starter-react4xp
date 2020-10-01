import React, { useState, useEffect } from 'react'


import './MovieList.scss';

import Movie from "../shared/Movie";

import doGuillotineRequest from "../../headless/guillotineRequest";
import { buildQueryListMovies, buildParentPathQuery, extractMovieArray } from "../../headless/helpers/movieListRequests";

// State values that don't need re-rendering capability, but need to be synchronously read/writable across closures.
let nextOffset = 0;             // Index for what will be the next movie to search for in a guillotine request


const MovieList = ({movies, apiUrl, parentPath, movieCount, sortExpression}) => {

    // UseEffect with these arguments ( function, [] ) corresponds to componentDidMount in the old-school class-based react components.
    // So now, isInitialized is obsolete.
    useEffect(
        ()=>{
            console.log("Initializing...");

            nextOffset = movieCount;
        },
        []
    );


    // ------------------------------------------------------
    // Set up action methods, triggered by listener:

    // Makes a (guillotine) request for data with these search parameters and passes an anonymous callback function as
    // handleDataFunc (used on the returned list of movie data).
    const makeRequest = () => {
        console.log("Requesting", movieCount, "movies, starting from index", nextOffset);
        doGuillotineRequest({
            url: apiUrl,

            query: buildQueryListMovies(),

            variables: {
                first: movieCount,
                offset: nextOffset,
                sort: sortExpression,
                parentPathQuery: buildParentPathQuery(parentPath)
            },

            extractDataFunc: extractMovieArray,

            handleDataFunc: (newMovieItems) => {
                console.log("Received data:", newMovieItems);
                nextOffset += movieCount;
            }
        });
    };

    // ------------------------------------------------------------------------------------
    // Actual rendering:

    return (
        <div className="movieList" onClick={makeRequest}>
            {movies
                ? movies.map(movie =>
                        <Movie key={movie.id} {...movie} />
                    )
                : null
            }
        </div>
    );
};

// MUST use this export line wrapping, because of the useState hook.
export default (props) => <MovieList {...props} />;
