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

    return {
        contentType: 'application/json',
        headers: CORS_HEADERS,
        body: graphQlLib.execute(SCHEMA, body.query, body.variables)
    };
};

exports.options = req => ({
    contentType: 'text/plain;charset=utf-8',
    headers: CORS_HEADERS
});
