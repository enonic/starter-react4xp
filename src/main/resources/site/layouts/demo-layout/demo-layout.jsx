import React from 'react';
import RegionRange from 'react4xp-templates/RegionRange';

// Of course, imported react components from chunks or entries can be used here too if needed:
// import Hello from '../../parts/hello-react/hello-react.jsx'

export default ({component}) => {

    // Just preventing and reporting errors:
    if (
        !component ||
        typeof component  !== 'object' ||
        !(Object.keys(component).length)
    ) {
        console.error(`<demo-layout> is missing component data: ${JSON.stringify(component)}`);
        throw Error(`Can't render <demo-layout> without component.`);
    }


    // The central part of a react layout template is as simple as these 3 JSX lines:
    return <div className="demo-layout">

        <RegionRange regionsObject={component.regions}/>


        {/* Of course, other imported react components from chunks or entries can be used here too if needed:
                <Hello greetee="world" />
         */}

    </div>;
};
