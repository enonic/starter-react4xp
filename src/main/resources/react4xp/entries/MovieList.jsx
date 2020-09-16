import React, { useState } from 'react'

import './MovieList.scss';
import requestMovies from "../shared/requestMovies";

import Movie from "./Movie";

const TRIGGER_OFFSET_PX_FROM_BOTTOM = 200;

// Initially, the initialization (scroll listener etc) hasn't been set up. This is permanently switched off on the first rendering.
let isInit = false;
let canMakeNewRequest = true;
let nextOffset = 0;                  // Index for what will be the next movie to search for in a guillotine request

const MovieList = ({movies, apiUrl, parentId, movieCount, movieType, sortExpression}) => {

    // Setup component state
    const [currentMovies, setCurrentMovies] = useState(movies);       // Array of data objects: currently displayed movies



    // ------------------------------------------------------
    // Setup action methods:


    // When a movie data array is returned from the guillotine data request, this method is called.
    // Merges incoming movie data into the component state (which react automatically renders to the DOM), preventing duplicates.
    // Also updates the index in the movies data that the next item should start searching at.
    const updateDOMWithNewMovies = movieItems => {
        console.log("Received data, adding new movies to state / DOM:", movieItems);

        if (movieItems.length > 0) {
            nextOffset += movieCount;

            const mergedMoviesList = [
                ...currentMovies,
                ...movieItems
            ];

            // Add movies: merge new movie items into existing state
            setCurrentMovies(mergedMoviesList);

            
        }
    };


    // Makes a (guillotine) request for data with these search parameters and passes updateDOMWithNewMovies as the callback
    // function to use on the returned list of movie data
    const makeRequest = () => {
        if (canMakeNewRequest) {
            canMakeNewRequest = false;
            setTimeout(
                ()=>{ canMakeNewRequest=true; console.log("Okay, you can try again now."); },
                500
            );
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
        } else {
            console.log("Easy now...");
        }
    };


    // Sets up scroll listener, on the first rendering only.
    // Causes a trigger func function to be called when the bottom of the visible window is scrolled down to less
    // than TRIGGER_OFFSET_PX_FROM_BOTTOM of the movie list element.
    const init = (scrollListenerTriggerFunc) => {
        console.log("Init scroll listener");

        nextOffset = movies.length;

        // Browser-specific functionality, so this is prevented from running on the backend
        if (typeof document === 'object' && typeof document.addEventListener === 'function' && typeof window !== 'undefined') {
            document.addEventListener("DOMContentLoaded", () => {
                var movieList = document.getElementById(`movieList_${parentId}`);
                window.addEventListener("scroll", () => {
                    var movieBounds = movieList.getBoundingClientRect();

                    if (movieBounds.bottom < window.innerHeight + TRIGGER_OFFSET_PX_FROM_BOTTOM) {
                        console.log("TRIGGER'D!")
                        scrollListenerTriggerFunc();
                    }
                });
            });
        }
    }

    // Initialize, but only once: we only want one scroll event listener to be set up.
    if (!isInit) {
        isInit = true;
        init(makeRequest);
    }

    // ------------------------------------------------------------------------------------
    // Actual output:

    console.log("Scroll down add more movies, starting at index", nextOffset);

    return <div id={`movieList_${parentId}`} className="movieList">
        {currentMovies
            ? currentMovies.map(movie =>
                <Movie key={movie.id} {...movie} />
                )
            : null
        }
    </div>
};

// MUST use this export line wrapping, because of the useState hook.
export default (props) => <MovieList {...props} />;
