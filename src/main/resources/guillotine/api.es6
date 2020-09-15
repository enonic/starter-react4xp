const guillotineLib = require('/lib/guillotine');
const graphQlLib = require('/lib/graphql');

const CORS_HEADERS = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Origin': '*'
};

const SCHEMA = guillotineLib.createSchema();

exports.post = req => {
    var body = JSON.parse(req.body);

    const output = {
        contentType: 'application/json',
        headers: CORS_HEADERS,
        body: graphQlLib.execute(SCHEMA, body.query, body.variables)
    };

    let status = 200;
    if (output.body.errors) {
        status = 400;
        log.info(`${output.body.errors.length} guillotine error${output.body.errors.length === 1 ? "" : "s"}: ${JSON.stringify(output.body.errors)}`);
        log.info(JSON.stringify(output.body.errors, null, 4));
        log.info("request.body.variables were: " + JSON.stringify(body.variables));
    }

    return {
        ...output,
        status
    }
};

exports.options = req => ({
    contentType: 'text/plain;charset=utf-8',
    headers: CORS_HEADERS
});
