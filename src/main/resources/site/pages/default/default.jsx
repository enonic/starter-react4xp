import React from 'react';
import Regions from 'react4xp-regions/Regions';

export default ({title, regionsData, regionNames, regionClasses}) => {
    console.log("\ntitle (" +
    	(Array.isArray(title) ?
    		("array[" + title.length + "]") :
    		(typeof title + (title && typeof title === 'object' ? (" with keys: " + JSON.stringify(Object.keys(title))) : ""))
    	) + "): " + JSON.stringify(title, null, 2)
    );
    console.log("\nregionsData (" +
    	(Array.isArray(regionsData) ?
    		("array[" + regionsData.length + "]") :
    		(typeof regionsData + (regionsData && typeof regionsData === 'object' ? (" with keys: " + JSON.stringify(Object.keys(regionsData))) : ""))
    	) + "): " + JSON.stringify(regionsData, null, 2)
    ); // */

    return
        <div className="react4xp-page">
            {title ? <h1>{title}</h1> : null}
            {regionsData ? <Regions regionsData={regionsData} classes={regionClasses} names={regionNames}/> : null}
        </div>;
};
