const React4xp = require('/lib/enonic/react4xp');

exports.get = function(request) {
    const props = {
        title: "En filmtittel",
        description: "Det er det det er",
        year: "2021",
        actors: []
    }

    const admin = new React4xp('Movie');
    admin.setProps(props);

    const body = admin.renderBody(request);
    const pgCon = admin.renderPageContributions(request);

    const output = React4xp.render(
        'Movie',
        props,
        request
        // , { clientRender: true }
    );

    return {
        contentType: 'text/html',
        body: `<html>
    <head>
        ${pgCon.headBegin.join('\n\t\t')}
        <title>R4X Admin tool</title>
        ${pgCon.headEnd.join('\n\t\t')}</head>
        
    <body>
        ${pgCon.bodyBegin.join('\n\t\t')}${body}
        ${pgCon.bodyEnd.join('\n\t\t')}</body>
</html>`
    }

    log.info(body);
    log.info(JSON.stringify(pgCon, null, 4));

    return output;
};
