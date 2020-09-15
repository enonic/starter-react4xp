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

    /*log.info("body.variables (" +
    	(Array.isArray(body.variables) ?
    		("array[" + body.variables.length + "]") :
    		(typeof body.variables + (body.variables && typeof body.variables === 'object' ? (" with keys: " + JSON.stringify(Object.keys(body.variables))) : ""))
    	) + "): " + JSON.stringify(body.variables, null, 2)
    );*/

    const output = {
        contentType: 'application/json',
        headers: CORS_HEADERS,
        body: graphQlLib.execute(SCHEMA, body.query, body.variables)
    };

/*    log.info("output (" +
    	(Array.isArray(output) ?
    		("array[" + output.length + "]") :
    		(typeof output + (output && typeof output === 'object' ? (" with keys: " + JSON.stringify(Object.keys(output))) : ""))
    	) + "): " + JSON.stringify(output, null, 2)
    );*/

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
