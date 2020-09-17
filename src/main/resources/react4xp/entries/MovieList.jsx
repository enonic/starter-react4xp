import React from 'react'

import './MovieList.scss';

import Movie from "./Movie";

const MovieList = ({movies}) => {

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

// MUST use this export line wrapping, because we will use a useState hook.
export default (props) => <MovieList {...props} />;
