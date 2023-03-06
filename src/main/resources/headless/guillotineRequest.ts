/**
 * Guillotine frontend boilerplate, import from/below react4xp entries. Performs a fetch POST call to a guillotine API endpoint.
 *
 * Usage: doGuillotineRequest(params);
 *
 * Params (object, mandatory):
 *      @param url (string, mandatory) URL to the guillotine API. This app comes with a default endpoint: ./guillotineApi.es6 - which is controller mapped to '/api/headless'.
 *      @param query (string, mandatory) Valid guillotine query. See docs at https://developer.enonic.com/templates/headless-cms and https://github.com/enonic/lib-guillotine/blob/master/docs/api.adoc#fields-1
 *      @param extractDataFunc (override function, optional): Takes the output object of response.json() and returns data in the shape required by handleDataFunc. By default just passes the object through unchanged. Must take a response-data argument (object) and return something.
 *      @param handleDataFunc (override function, optional): Takes the output of extractDataFunc and does something with it. By default does nothing.
 *      @param handleResponseErrorFunc (override function, optional): Checks aspects of the API response. By default just checks the status code. Must take a response argument (object) and return it.
 *      @param catchErrorsFunc (override function, optional): Handles any errors that were thrown after the fetch.
 */



const PARAM_TYPES = {
    url: 'string',
    query: 'string',
    variables: 'object',
    handleResponseErrorFunc: 'function',
    extractDataFunc: 'function',
    handleDataFunc: 'function',
    catchErrorsFunc: 'function',
}

const checkParams = params => {
    if (!params || typeof params !== 'object') {
        throw Error('Missing or invalid params argument. Supply a valid object: doGuillotineRequest(params);');
    }

    Object.keys(params).forEach( key => {
        if (params[key] && typeof params[key] !== PARAM_TYPES[key]) {
            throw Error(`Invalid parameter type. Supply a valid '${key}' ${PARAM_TYPES[key]} parameter: doGuillotineRequest({${key}: <${PARAM_TYPES[key]}>, etc});`);
        }
    })

    if ((params.url || '').trim() === '') {
        throw Error("Missing URL to the guillotine API. Supply a valid 'url' string parameter: doGuillotineRequest({url: '...', etc}); ");
    }
    if ((params.query || '').trim() === '') {
        throw Error("Missing guillotine query. Supply a valid 'query' string parameter: doGuillotineRequest({query: '...', etc}); ");
    }
};


const extractParamsOrDefaults = params => {
    checkParams(params);

    return {
        url: params.url,
        query: params.query,
        variables: params.variables || {},
        handleResponseErrorFunc: params.handleResponseErrorFunc || (
            response => {
                if (!(response.status < 300)) {
                    throw Error(`Guillotine API response:\n\n${response.status} - ${response.statusText}.\n\nAPI url: ${response.url}\n\nInspect the request and/or the server log.`);
                }
                return response;
            }
        ),
        extractDataFunc: params.extractDataFunc || ( responseData => responseData ),
        handleDataFunc: params.handleDataFunc || function(){},
        catchErrorsFunc: params.catchErrorsFunc || ( error => {console.error(error);} )
    }
}

// ---------------------------------------------------------

const doGuillotineRequest = (params) => {

    const {url, query, variables, handleResponseErrorFunc, extractDataFunc, handleDataFunc, catchErrorsFunc } = extractParamsOrDefaults(params);

    fetch(
        url,
        {
            method: "POST",
            body: JSON.stringify({
                query,
                variables}
            ),
            credentials: "same-origin",
        }
    )
        .then(handleResponseErrorFunc)
        .then(response => response.json())
        .then(extractDataFunc)
        .then(handleDataFunc)
        .catch(catchErrorsFunc)
};

export default doGuillotineRequest;
