import React from 'react'

import './Movie.scss';

const Cast = ({actors}) => (
    <ul className="cast">
        { actors.map( actor => <li key={actor} className="actor">{actor}</li> ) }
    </ul>
);


const Info = ({heading, children}) => (
    <div className="info">
        {heading ? <h3>{heading}</h3> : null}
        {children}
    </div>
);


const InfoContainer = ({title, year, description, actors}) => (
    <div className="infoContainer">
        <h2 className="title">{title}</h2>

        <Info heading="Released">
            <p className="year">{year}</p>
        </Info>

        <Info heading="Description">
            <div className="description"
                 dangerouslySetInnerHTML={{ __html: description }}>
            </div>
        </Info>

        { (actors && actors.length > 0) ?
            <Info heading="Cast">
                <Cast actors={actors} />
            </Info> :
            null
        }
    </div>
);

const Movie = ({imageUrl, title, description, year, actors}) => (
    <div className="movie">
        <img className="poster"
             src={imageUrl}
             alt={`Movie poster: ${title}`}
             title={`Movie poster: ${title}`}/>

        <InfoContainer title={title}
                       year={year}
                       description={description}
                       actors={actors}
        />
    </div>
);

export default Movie;
