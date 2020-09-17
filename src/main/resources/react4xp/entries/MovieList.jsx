import React from 'react'

import './MovieList.scss';
import requestMovies from "../shared/requestMovies";

import Movie from "./Movie";

// State values that don't need re-rendering capability, but need to be synchronously read/writable across closures.
let isInitialized = false;
let nextOffset = 0;             // Index for what will be the next movie to search for in a guillotine request



const MovieList = ({movies, apiUrl, parentId, movieCount, movieType, sortExpression}) => {

    if (!isInitialized) {
        isInitialized = true;

        nextOffset = movieCount;
    }

    // ------------------------------------------------------
    // Set up action methods, triggered by listener:

    // Makes a (guillotine) request for data with these search parameters and passes an anonymous callback function as
    // handleDataFunc (used on the returned list of movie data).
    const makeRequest = () => {
        console.log("Requesting", movieCount, "movies, starting from index", nextOffset);
        requestMovies({
            apiurl: apiUrl,
            contentid: parentId,
            first: movieCount,
            offset: nextOffset,
            movietype: movieType,
            sort: sortExpression,
            handleDataFunc: (newMovieItems) => {
                console.log("Received data:", newMovieItems);

                nextOffset += movieCount;
            }
        });
    };


    // ------------------------------------------------------------------------------------
    // Actual rendering:


    console.log("------------------------- Rendering movies:", movies.map(movie => movie.title));
    console.log("Click to add more movies, starting at index", nextOffset);

    return (
        <div id={`movieList_${parentId}`} className="movieList" onClick={makeRequest}>
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
