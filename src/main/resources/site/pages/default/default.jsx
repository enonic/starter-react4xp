import React from 'react';
import Regions from 'react4xp-regions/Regions';
import styles from '../../../react4xp/styles/default-page.scss';

export default ({title, regionsData, regionNames, regionClasses}) => <div className="react4xp-page">
            {title ? <h1 className={styles.heading}>{title}</h1> : null}
            {regionsData ? <Regions regionsData={regionsData} classes={regionClasses} names={regionNames}/> : null}
        </div>;

