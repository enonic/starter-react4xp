const portal = require('/lib/xp/portal');

exports.get = function() {
    let content = portal.getContent();

    let getMovieScript = portal.assetUrl({
        path: "/script/getMovies.js",
        type: "absolute"
    });

    const listContentType = `${app.name.replace(/\./g, '_')}_Movie`

    return {
        body: `        
            <div style="display:none" 
            id="show-movies-constants" 
            data-apiurl="./${content._name}/api/guillotine" 
            data-contentid="${content._id}"
            data-first="40"
            data-offset="0"
            data-contenttype="${listContentType}"
            data-sortby="displayName ASC"></div>
        `,
        pageContributions: {
            headEnd:[
                `<script src="${getMovieScript}"></script>`
            ],
        }

    }
}

