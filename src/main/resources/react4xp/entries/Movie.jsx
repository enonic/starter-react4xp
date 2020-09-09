import React from 'react'

import './Movie.scss';

import InfoContainer from "../shared/movie/InfoContainer";

const Movie = ({imageUrl, title, description, year, actors}) => (
    <div className="movie">
        <img className="poster" src={imageUrl} title={title} alt={title} />

        <InfoContainer title={title}
                       year={year}
                       description={description}
                       actors={actors}
        />
    </div>
);

export default Movie;
