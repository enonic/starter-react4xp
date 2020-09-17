import React, { useState } from 'react'

import './MovieList.scss';
import requestMovies from "../shared/requestMovies";

import Movie from "./Movie";

// State values that don't need re-rendering capability, but need to be synchronously read/writable across closures.
let isInitialized = false;
let nextOffset = 0;             // Index for what will be the next movie to search for in a guillotine request

const MovieList = ({movies, apiUrl, parentId, movieCount, movieType, sortExpression}) => {

    // Setup asunchronous component state that triggers re-render on change.
    const [state, setState] = useState({
        movies,                     // Array of data objects: currently displayed movies
    });

    if (!isInitialized) {
        isInitialized = true;
        nextOffset = movieCount;
    }

    // ------------------------------------------------------
    // Set up action methods, triggered by listener:

    // Makes a (guillotine) request for data with these search parameters and passes updateDOMWithNewMovies as the callback
    // function to use on the returned list of movie data
    const makeRequest = (state) => {
        console.log("Requesting", movieCount, "movies, starting from index", nextOffset);
        requestMovies({
            apiurl: apiUrl,
            contentid: parentId,
            first: movieCount,
            offset: nextOffset,
            movietype: movieType,
            sort: sortExpression,
            handleDataFunc: (newMovieItems) => updateDOMWithNewMovies(newMovieItems, state)
        });
    };




    // When a movie data array is returned from the guillotine data request, this method is called.
    // Merges incoming movie data into the component state (which react automatically renders to the DOM), preventing duplicates.
    // Also updates the index in the movies data that the next item should start searching at.
    const updateDOMWithNewMovies = (newMovieItems, state) => {
        console.log("Received data:", newMovieItems);

        if (newMovieItems.length > 0) {

            // Prevent possible duplicates
            const movieIds = state.movies.map(movie => movie.id);
            const movieItemsToAdd = newMovieItems.filter(movie => movieIds.indexOf(movie.id) === -1);
            console.log("Adding movies to state:", newMovieItems.map(movie => movie.title));

            nextOffset += movieCount;

            // Use a function, not just a new direct object/array, for mutating state object/array instead of replacing it:
            setState(oldState => ({
                movies: [
                    ...oldState.movies,
                    ...movieItemsToAdd
                ]
            }));

            console.log("Added new movies to state / DOM.");
        }
    };



    // ------------------------------------------------------------------------------------
    // Actual rendering:


    console.log("------------------------- Rendering state.movies:", state.movies.map(movie => movie.title));
    console.log("Click to add more movies, starting at index", nextOffset);

    return (
        <div id={`movieList_${parentId}`} className="movieList" onClick={() => makeRequest(state)}>
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
