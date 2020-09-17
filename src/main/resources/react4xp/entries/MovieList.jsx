import React from 'react'

import './MovieList.scss';

import Movie from "./Movie";

const MovieList = ({movies, parentId, apiUrl, movieCount, movieType, sortExpression}) => {

    return (
        <div id={`movieList_${parentId}`} className="movieList">
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
