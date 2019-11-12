import React from 'react';
import RegionRange from 'react4xp-templates/RegionRange';
import Hello from '../../parts/hello-react/hello-react.jsx'

export default ({component}) => {
    if (
        !component ||
        typeof component  !== 'object' ||
        !(Object.keys(component).length)
    ) {
        console.error(`<the-layout> missing component: ${JSON.stringify(component)}`);
        throw Error(`Can't render <the-layout> without component.`);
    }

    return <div className="row">
        <Hello greetee="IN A LAYOUT!" />
        <RegionRange regionsObject={component.regions}/>
    </div>;
};
