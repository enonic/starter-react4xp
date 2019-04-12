// Two standalone (independent of XP components) webapps in one:
// <domain:port>/webapp/com.enonic.app.react4xp gives

const thymeleaf = require('/lib/thymeleaf');

const dependencies = require('/lib/enonic/react4xp/dependencies');

const viewPure = resolve('pure.html');
const viewInserted= resolve('inserted.html');

exports.get = req => {

    // Default rendering is a semi-serverside: client-side rendering, inserting all urls for dependencies and entries with thymeleaf from the model.
    // Add a "?pure" URL parameter to see a completely standalone client rendering, getting nothing from the controller, only using the services
    const pure = (req.params && req.params.pure != null && req.params.pure != "false");

    // Without a "?pure" parameter, some dependency URLs are inserted:
    const model = (!pure) ?
        { urls: [...dependencies.getAllUrls('SimpleGreeter'), `/_/service/${app.name}/react4xp/SimpleGreeter`] } :
        {};

    // Decides the HTML view depending on the "?pure" parameter.
    const view = (pure) ? viewPure : viewInserted;

    return {
        body: thymeleaf.render(view, model)}
};
