const guillotineLib = require('/lib/guillotine');
const graphQlLib = require('/lib/graphql');

const CORS_HEADERS = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Origin': '*'
};

const SCHEMA = guillotineLib.createSchema();

// ----------------------------------------------  FOR USE IN CONTROLLERS    ------------------------------------

exports.executeQuery = (query, variables) => graphQlLib.execute(SCHEMA, query, variables);

// ----------------------------------------------  FRONTEND EXPOSED METHODS  ------------------------------------

exports.post = req => {
    var body = JSON.parse(req.body);

    log.info("\n-----------\nReceived query: " + body.query);
    log.info("\nVariables: " + JSON.stringify(body.variables, null, 4));

    const output = {
        contentType: 'application/json',
        headers: CORS_HEADERS,
        body: exports.executeQuery(body.query, body.variables)
    };

    let status = 200;
    if (output.body.errors) {
        status = 400;
        log.error(`${output.body.errors.length} guillotine error${output.body.errors.length === 1 ? "" : "s"}: ${JSON.stringify(output.body.errors)}`);
        log.error(JSON.stringify(output.body.errors, null, 4));
        log.info("request.body.variables were: " + JSON.stringify(body.variables));
    } else {
        log.info("\n------->\nOutput.body: " + JSON.stringify(output.body, null, 4));
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
