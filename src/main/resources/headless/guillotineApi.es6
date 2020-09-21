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




/** Guillotine API endpoint exposed to browsers.
 *
 * @param req The request. req.body must be a JSON-string, parseable to an object with parameters: body and variables.
 * These will be run through the guillotine engine and JSON data will be returned.
 *
 * ------------   IMPORTANT!   --------------   IMPORTANT!   --------------   IMPORTANT!   --------------
 *
 * This is as bare-bone as it gets, and is open to sending any query into the data layer - including mutating operations.
 * It's strongly recommended to restrict this and implement your own security solution, according to your use case and requirements!
 */
exports.post = req => {
    var body = JSON.parse(req.body);

    log.info("body.query: " + body.query);
    log.info("body.variables (" +
    	(Array.isArray(body.variables) ?
    		("array[" + body.variables.length + "]") :
    		(typeof body.variables + (body.variables && typeof body.variables === 'object' ? (" with keys: " + JSON.stringify(Object.keys(body.variables))) : ""))
    	) + "): " + JSON.stringify(body.variables, null, 2)
    );

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

    } else {
        log.info("output: " + JSON.stringify(output));
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
