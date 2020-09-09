import React from 'react';

import './InfoContainer.scss';

import Info from "./Info";
import Cast from './Cast'

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

        <Info heading="Cast">
            <Cast actors={actors} />
        </Info>
    </div>
);

export default InfoContainer;
