const portal = require('/lib/xp/portal');

exports.get = function() {
    let content = portal.getContent();

    let getMovieScript = portal.assetUrl({
        path: "/script/getMovie.js",
        type: "absolute"
    });

    var graphqlServiceUrl = portal.serviceUrl({
        service: 'graphql',
        application: 'com.enonic.app.guillotine',
        type: "absolute"
    });

    return {
        body: `        
            <div style="display:none;" id="content" data-key="${content._id}"></div>
            <div style="display:none;" id="url" data-url="${graphqlServiceUrl}"></div>
            <div id="movie"></div>
        `,
        pageContributions: {
            headEnd:[
                `<script src="${getMovieScript}"></script>`
            ],

        }

    }
}

