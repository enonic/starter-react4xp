import React from 'react';
import Region from 'react4xp-templates/Region';

// Of course, imported react components from chunks or entries can be used here too if needed:
// import Hello from '../../parts/hello-react/hello-react.jsx'

export default ({content}) =>
    <html>
        <head>
            {content.displayName ? <title>{content.displayName}</title> : null}
        </head>

        <body className="xp-page">
            {content.page.regions.main ?
                <Region name="main"
                        regionData={content.page.regions.main}
                        addClass="main"
                        tag="main"
                /> :
                null
            }
        </body>
    </html>;

/*
It's also possible to use Regions instead of Region:

import Regions from 'react4xp-templates/Regions';

(...)

    <Regions regions={content.page.regions}
                 names="main"
                 classes={{main: "main"}}
                 tags={{main: "main"}}
    />

If this page template needed to handle several regions, for example with names "one", "two" and "three", You could use
Regions to render and populate all three, in the order you want (or skipping some of them) using the 'names' prop, for
example like this:

    <Regions regions={content.page.regions}
                 names={["two", "one", "three"]}   // <-- Sets the region sequence in the DOM. Selecing only 2 here would skip the third one, etc.
                 classes={{
                    one: "main",
                    two: "topMenu",
                    three: "sideMenu"
                 }}
                 tags={{one: "main"}}
    />

*/
