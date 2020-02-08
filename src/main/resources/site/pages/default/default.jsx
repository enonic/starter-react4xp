import React from 'react';
import Regions from 'react4xp-regions/Regions';

export default ({title, regionsData, regionNames, regionClasses}) => <div className="react4xp-page">
            {title ? <h1>{title}</h1> : null}
            {regionsData ? <Regions regionsData={regionsData} classes={regionClasses} names={regionNames}/> : null}
        </div>;

