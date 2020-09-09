import React from 'react'

import './MovieList.scss';

import Movie from "./Movie";

const MovieList = ({movies}) => (
    <div className="movieList">
        {movies ?
            movies.map(movie => <Movie key={movie.id} {...movie} />) :
            null
        }
    </div>
);

export default (props) => <MovieList {...props} />;
