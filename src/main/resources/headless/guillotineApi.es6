const guillotineLib = require('/lib/guillotine');
const graphQlLib = require('/lib/graphql');

const CORS_HEADERS = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Origin': '*'
};

const SCHEMA = guillotineLib.createSchema();

// ----------------------------------------------  FOR USE IN CONTROLLERS:    ------------------------------------

exports.executeQuery = (query, variables) => graphQlLib.execute(SCHEMA, query, variables);






// ----------------------------------------------  FRONTEND EXPOSED METHODS:  ------------------------------------


/** Guillotine API endpoint exposed to browsers - if you add a mapping to site.xml
 *  (e.g. <mapping controller="/headless/guillotineApi.js" order="50"><pattern>/api/headless</pattern>)
 *
 * ------------   IMPORTANT!   --------------   IMPORTANT!   --------------   IMPORTANT!   --------------
 *
 * Before you add that mapping and expose the API, consider this:
 * This API is as-is, and as bare-bone as it gets. It is currently open to sending ANY QUERY into the data layer
 * - including mutating operations etc! It's meant for developers to expand from, and STRONGLY RECOMMENDED to implement
 * your own security solution according to your specific use case and requirements!
 *
 *-------------------------------------------------------------------------------------------------------
 *
 * @param req req.body must be a JSON-string, parseable to an object with parameters: body and variables.
 * These will be run through the guillotine engine and JSON data will be returned.
 */
exports.post = req => {
    var body = JSON.parse(req.body);
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
        log.info("The error happened with these request.body.variables: " + JSON.stringify(body.variables));

    } /*else {
        log.info("--------> output: " + JSON.stringify(output, null, 2));
    }*/

    return {
        ...output,
        status
    }
};

exports.options = req => ({
    contentType: 'text/plain;charset=utf-8',
    headers: CORS_HEADERS
});
