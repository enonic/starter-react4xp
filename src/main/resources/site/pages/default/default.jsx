import React from 'react';
import Region from 'react4xp-regions/Region';

// Of course, imported react components from chunks or entries can be used here too if needed:
// import Hello from '../../parts/hello-react/hello-react.jsx'

export default ({component, displayName}) => {
    return <html>
        <head>
            {displayName ? <title>{displayName}</title> : null}
        </head>

        <body className="xp-page">
            {component.regions.main ?
                <Region name="main"
                        regionData={component.regions.main}
                        addClass="main"
                        tag="main"
                /> :
                null
            }
        </body>
    </html>;
};

/* It's also possible to use <Regions> instead of <Region>, for cases where several regions should be rendered in one go:

import Regions from 'react4xp-templates/Regions';

(...)

    <Regions regions={component.regions}
                 names="main"
                 classes={{main: "main"}}
                 tags={{main: "main"}}
    />

If this page template needed to handle several regions, for example with names "one", "two" and "three", You could use
Regions to render and populate all three, in the order you want (or skipping some of them) using the 'names' prop, for
example like this:

    <Regions regions={component.regions}
                 names={["two", "one", "three"]}   // <-- Sets the region sequence in the DOM. Selecing only 2 here would skip the third one, etc.
                 classes={{
                    one: "main",
                    two: "topMenu",
                    three: "sideMenu"
                 }}
                 tags={{one: "main"}}
    />

*/
