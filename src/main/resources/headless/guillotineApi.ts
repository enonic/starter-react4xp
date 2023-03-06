import {
    createSchema,
    execute,
    //@ts-ignore // no types
} from '/lib/guillotine';

const CORS_HEADERS = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    // 'Access-Control-Allow-Origin': '*'
};

const SCHEMA = createSchema();

// ----------------------------------------------  FOR USE IN CONTROLLERS:    ------------------------------------

export const executeQuery = (query, variables) => execute({
    query: query,
    variables: variables,
    schema: SCHEMA
});






// ----------------------------------------------  FRONTEND EXPOSED METHODS:  ------------------------------------


/** Guillotine API endpoint exposed to browsers - if you add a mapping to site.xml
 *  (e.g. <mapping controller="/headless/guillotineApi.js" order="50"><pattern>/api/headless</pattern>)
 *
 * ------------   IMPORTANT!   --------------   IMPORTANT!   --------------   IMPORTANT!   --------------
 *
 * Before you add that mapping and expose this API, consider this:
 * This API is as-is, and as bare-bone as it gets. Guillotine is a read-only interface, but this endpoint still exposes
 * the possibility to send ANY QUERY, so any data will technically be readable from your repo.
 * This is meant for developers to expand from, and it's strongly recommended to implement your own security solution
 * according to your specific use case and requirements.
 *
 *-------------------------------------------------------------------------------------------------------
 *
 * @param req req.body must be a JSON-string, parseable to an object with parameters: body and variables.
 * These will be run through the guillotine engine and JSON data will be returned.
 */
export const post = req => {
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

    }

    return {
        ...output,
        status
    }
};

export const options = req => ({
    contentType: 'text/plain;charset=utf-8',
    headers: CORS_HEADERS
});
