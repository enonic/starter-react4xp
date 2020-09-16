import React, { useState } from 'react'

import './MovieList.scss';
import requestMovies from "../shared/requestMovies";

import Movie from "./Movie";

const TRIGGER_OFFSET_PX_FROM_BOTTOM = 200;

// Initially, the initialization (scroll listener etc) hasn't been set up. This is permanently switched off on the first rendering.


const MovieList = ({movies, apiUrl, parentId, movieCount, movieType, sortExpression}) => {

    // Setup asunchronous component state that triggers re-render on change.
    const [state, setState] = useState({
        movies                     // Array of data objects: currently displayed movies
    });

    // State values that don't need re-rendering capability, but need to be synchronously read/writable across closures.
    const synchronousState = {
        isInitialized: false,
        nextOffset: movieCount,     // Index for what will be the next movie to search for in a guillotine request
        listenForScroll: true,      // Switches off the scroll listener during request and processing, switches back on aftwerwards
        movieIds: movies.map( movie => movie.id )
    };





    // -----------------------------------------------------  Scroll listener

    // Trigger initialization, but only once: we only want one scroll event listener to be set up.
    if (!synchronousState.isInitialized) {
        synchronousState.isInitialized = true;
        initialize();
    }


    // Set up scroll listener, on the first rendering only.
    // Causes a trigger func function to be called when the bottom of the visible window is scrolled down to less
    // than TRIGGER_OFFSET_PX_FROM_BOTTOM of the movie list element.
    function initialize() {

        // Browser-specific functionality, so this is prevented from running on the SSR
        if (typeof document === 'object' && typeof document.addEventListener === 'function' && typeof window !== 'undefined') {
            document.addEventListener("DOMContentLoaded", () => {
                // console.log("Init scroll listener");

                var movieListElem = document.getElementById(`movieList_${parentId}`);

                // ACTUAL SCROLL LISTENER:
                window.addEventListener("scroll", () => {

                    if (synchronousState.listenForScroll) {
                        var movieBounds = movieListElem.getBoundingClientRect();

                        if (movieBounds.bottom < window.innerHeight + TRIGGER_OFFSET_PX_FROM_BOTTOM) {
                            console.log("!!! SCROLL TRIGGER !!!");

                            // Stop acting on scroll events, until data is returned.
                            synchronousState.listenForScroll = false;

                            makeRequest();

                        }
                    } /*else {
                        console.log("Easy now...");
                    }*/
                });
            });
        }
    }


    // ------------------------------------------------------
    // Set up action methods, triggered by listener:

    // Makes a (guillotine) request for data with these search parameters and passes updateDOMWithNewMovies as the callback
    // function to use on the returned list of movie data
    const makeRequest = () => {
        const nextOffset = synchronousState.nextOffset;
        console.log("Requesting", movieCount, "movies, starting from index", nextOffset);
        requestMovies({
            apiurl: apiUrl,
            contentid: parentId,
            first: movieCount,
            offset: nextOffset,
            movietype: movieType,
            sort: sortExpression,
            handleDataFunc: updateDOMWithNewMovies
        });
    };




    // When a movie data array is returned from the guillotine data request, this method is called.
    // Merges incoming movie data into the component state (which react automatically renders to the DOM), preventing duplicates.
    // Also updates the index in the movies data that the next item should start searching at.
    const updateDOMWithNewMovies = (newMovieItems) => {
        console.log("Received data:", newMovieItems);

        if (newMovieItems.length > 0) {
            synchronousState.nextOffset += movieCount;

            // Prevent duplicates
            newMovieItems = newMovieItems.filter(movie => synchronousState.movieIds.indexOf(movie.id) === -1);
            synchronousState.movieIds.push(...newMovieItems.map(movie => movie.id));
            // console.log("Adding movies to state:", newMovieItems.map(movie => movie.name));

            // Use a function, not just a new direct object/array, for mutating state object/array instead of replacing it:
            setState(oldState => ({
                movies: [
                    ...oldState.movies,
                    ...newMovieItems
                ]
            }));
        }

        // Switch back on the scroll listener's actions.
        synchronousState.listenForScroll = true;

        console.log("...Ready. Added new movies to state / DOM. Scroll down add more movies, starting at index", synchronousState.nextOffset);
    };



    // ------------------------------------------------------------------------------------
    // Actual rendering:


    console.log("------------------------- currentMovies rendered:", state.movies.map(movie => movie.title));

    return (
        <div id={`movieList_${parentId}`} className="movieList">
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
