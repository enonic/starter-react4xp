import React, { useState } from 'react'

import './MovieList.scss';

import Movie from "./Movie";

import doGuillotineRequest from "../../headless/guillotineRequest";
import { buildQueryListMovies, extractMovieArray } from "../../headless/helpers/movieListRequests";

// State values that don't need re-rendering capability, but need to be synchronously read/writable across closures.
let isInitialized = false;
let nextOffset = 0;             // Index for what will be the next movie to search for in a guillotine request



const MovieList = ({movies, apiUrl, parentPath, movieCount, movieType, sortExpression}) => {

    // Setup asunchronous component state that triggers re-render on change.
    const [state, setState] = useState({
        movies,                     // Array of data objects: currently displayed movies
    });

    const listContainerId = `movieListContainer_${parentPath}`;

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

        doGuillotineRequest({
            url: apiUrl,

            query: buildQueryListMovies(movieType, parentPath),
            variables: {
                first: movieCount,
                offset: nextOffset,
                sort: sortExpression,
            },

            extractDataFunc: extractMovieArray,

            handleDataFunc: updateDOMWithNewMovies
        });
    };




    // When a movie data array is returned from the guillotine data request, this method is called.
    // Merges incoming movie data into the component state (which react automatically renders to the DOM), preventing duplicates.
    // Also updates the index in the movies data that the next item should start searching at.
    const updateDOMWithNewMovies = (newMovieItems) => {
        console.log("Received data:", newMovieItems);
        console.log(newMovieItems.map(movie => movie.title));

        nextOffset += movieCount;
    };


    // ------------------------------------------------------------------------------------
    // Actual rendering:


    console.log("------------------------- Rendering state.movies:", state.movies.map(movie => movie.title));
    console.log("Click to add more movies, starting at index", nextOffset);

    return (
        <div id={`${listContainerId}`} className="movieList" onClick={makeRequest}>
            {state.movies
                ? state.movies.map(movie =>
                        <Movie key={movie.id} {...movie} />
                    )
                : null
            }
        </div>
    );
};

// MUST use this export line wrapping, because of the useState hook.
export default (props) => <MovieList {...props} />;
