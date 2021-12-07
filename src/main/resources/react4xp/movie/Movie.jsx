import React from 'react'

import './Movie.scss';

import InfoContainer from "./InfoContainer";

const Movie = ({imageUrl, title, description, year, actors}) => {
    return <div className="movie">
        {imageUrl && (
            <img className="poster"
                 src={imageUrl}
                 alt={`Movie poster: ${title}`}
                 title={`Movie poster: ${title}`}/>
        )}

        <InfoContainer title={title}
                       year={year}
                       description={description}
                       actors={actors}
        />
    </div>
};

export default props => <Movie {...props}/>;
