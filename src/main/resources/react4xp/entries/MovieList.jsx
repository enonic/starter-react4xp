import React from 'react'

import './MovieList.scss';

import Movie from "./Movie";

const MovieList = ({movies}) => {

    console.log("------------------------- Rendering movies:", movies.map(movie => movie.title));

    return (
        <div className="movieList">
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
