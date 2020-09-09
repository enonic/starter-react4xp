import React from 'react';

import './Cast.scss';

const Cast = ({actors}) => (
    <ul className="cast">
        { actors.map( actor => <li className="actor">{actor}</li> ) }
    </ul>
);

export default Cast;
