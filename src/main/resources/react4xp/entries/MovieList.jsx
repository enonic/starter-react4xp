import React, { useState } from 'react'

import './MovieList.scss';
import requestMovies from "../shared/requestMovies";

import Movie from "./Movie";

const MovieList = ({movies, apiUrl, parentId, movieCount, movieType, sortExpression}) => {

    const [state, setState] = useState({displayingMovies: movies, nextOffsetState: movies.length});

    const updateDOMWithNewMovies = movieItems => {
        const moviesToDisplay = [...state.displayingMovies];
        const moviesIds = state.displayingMovies.map(movie => movie.id);
        movieItems.forEach(movie => {
            if (moviesIds.indexOf(movie.id)===-1) {
                moviesIds.push(movie.id);
                moviesToDisplay.push(movie);
            }
        });

        setState({
            displayingMovies: moviesToDisplay,
            nextOffsetState: moviesToDisplay.length
        });
    };

    const makeRequest = () => {
        console.log("Requesting", movieCount,"movies, starting from index", state.nextOffsetState);
        requestMovies({
            apiurl: apiUrl,
            contentid: parentId,
            first: movieCount,
            offset: state.nextOffsetState,
            movietype: movieType,
            sort: sortExpression,
            handleDataFunc: updateDOMWithNewMovies
        });
    };

    console.log("Click to add more movies, starting at index", state.nextOffsetState)

    return <div className="movieList" onClick={makeRequest}>
        {state.displayingMovies
            ? state.displayingMovies.map(movie =>
                <Movie key={movie.id} {...movie} />
                )
            : null
        }
    </div>
};

export default (props) => <MovieList {...props} />;
