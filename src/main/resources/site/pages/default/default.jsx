import React from 'react';
import Region from 'react4xp-templates/Region';

// Of course, imported react components from chunks or entries can be used here too if needed:
// import Hello from '../../parts/hello-react/hello-react.jsx'

export default ({content}) => {
    return <html>
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
            {content.page.regions.secondary ?
                <Region name="secondary"
                        regionData={content.page.regions.secondary}
                        addClass="secondary"
                /> :
                null
            }


        </body>
    </html>;
};

/* The two regions above could be automatically resolved like this instead:

import RegionRange from 'react4xp-templates/RegionRange';

(...)

    <RegionRange regions={content.page.regions}
                 classes={{main: "main", secondary: "secondary"}}
                 tags={{main: "main"}}
                 TODO: names={["main","secondary"]}
    />

*/
