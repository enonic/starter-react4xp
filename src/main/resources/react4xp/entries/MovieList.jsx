import React from 'react'

import './MovieList.scss';
import requestMovies from "../shared/requestMovies";

import Movie from "./Movie";

const MovieList = ({movies, apiUrl, parentId, movieCount, movieType, sortExpression}) => {

    const handleDataFunc = movieItems => {
        movieItems.forEach( movie => {
            console.log(JSON.stringify(movie, null, 2));
        });
    };

    const makeRequest = () => {
        console.log("Making movie list request...");
        requestMovies({
            apiurl: apiUrl,
            contentid: parentId,
            first: movieCount,
            offset: movieCount,
            movietype: movieType,
            sort: sortExpression,
            handleDataFunc
        });
    };

    return <div className="movieList"
                onClick={makeRequest}
    >
        {movies ?
            movies.map(movie => <Movie key={movie.id} {...movie} />) :
            null
        }
    </div>
};

export default (props) => <MovieList {...props} />;
