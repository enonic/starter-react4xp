import React, { useState } from 'react'

import './MovieList.scss';

import Movie from "./Movie";

import doGuillotineRequest from "../../headless/guillotineRequest";
import { buildQueryListMovies, extractMovieArray } from "../../headless/helpers/movieListRequests";

// State values that don't need re-rendering capability, but need to be synchronously read/writable across closures.
let isInitialized = false;
let nextOffset = 0;             // Index for what will be the next movie to search for in a guillotine request
const movieIds = []
let listenForScroll = true;     // Switches off the scroll listener during request and processing, switches back on aftwerwards

const TRIGGER_OFFSET_PX_FROM_BOTTOM = 200;


const MovieList = ({movies, apiUrl, parentPath, movieCount, movieType, sortExpression}) => {

    // Setup asunchronous component state that triggers re-render on change.
    const [state, setState] = useState({
        movies,                     // Array of data objects: currently displayed movies
    });

    const listContainerId = `movieListContainer_${parentPath}`

    // Set up scroll listener, on the first rendering only.
    // Causes a trigger func function to be called when the bottom of the visible window is scrolled down to less
    // than TRIGGER_OFFSET_PX_FROM_BOTTOM of the movie list element.
    const initScrollListener = () => {
        // Browser-specific functionality, so this is prevented from running on the SSR
        if (typeof document === 'object' && typeof document.addEventListener === 'function' && typeof window !== 'undefined') {
            document.addEventListener("DOMContentLoaded", () => {
                console.log("Init scroll listener");

                var movieListElem = document.getElementById(listContainerId);

                // ACTUAL SCROLL LISTENER:
                window.addEventListener("scroll", () => {

                    if (listenForScroll) {
                        var movieBounds = movieListElem.getBoundingClientRect();

                        if (movieBounds.bottom < window.innerHeight + TRIGGER_OFFSET_PX_FROM_BOTTOM) {
                            console.log("!!! SCROLL TRIGGER !!!");

                            // Stop acting on scroll events, until data is returned.
                            listenForScroll = false;

                            makeRequest();

                        }
                    }
                });
            });
        }
    }


    if (!isInitialized) {
        isInitialized = true;

        nextOffset = movieCount;
        movieIds.push(...movies.map( movie => movie.id ));

        initScrollListener();
    }


    // ------------------------------------------------------
    // Set up action methods, triggered by listener:

    // Makes a (guillotine) request for data with these search parameters and passes updateDOMWithNewMovies as the callback
    // function to use on the returned list of movie data
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

        if (newMovieItems.length > 0) {

            // Prevent possible duplicates
            const movieItemsToAdd = newMovieItems.filter(movie => movieIds.indexOf(movie.id) === -1);
            movieIds.push(...movieItemsToAdd.map(movie => movie.id));

            console.log("Adding movies to state:", movieItemsToAdd.map(movie => movie.title));

            nextOffset += movieCount;

            // Use a function, not just a new direct object/array, for mutating state object/array instead of replacing it:
            setState(oldState => ({
                movies: [
                    ...oldState.movies,
                    ...movieItemsToAdd
                ]
            }));

            console.log("Added new movies to state / DOM.");

            // Switch back on the scroll listener's actions.
            listenForScroll = true;

        } else {
            setTimeout(
                () => {  listenForScroll = true; },
                500
            )
        }
    };



    // ------------------------------------------------------------------------------------
    // Actual rendering:


    console.log("------------------------- Rendering state.movies:", state.movies.map(movie => movie.title));
    console.log("Click to add more movies, starting at index", nextOffset);

    return (
        <div id={`${listContainerId}`} className="movieList">
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
