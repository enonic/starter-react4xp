// XP serves a free-floating (not XP component bound) HTML page with react rendering.

const thymeleaf = require('/lib/thymeleaf');

const dependencies = require('/lib/enonic/react4xp/dependencies');

const view1 = resolve('main1.html');
const view2 = resolve('main2.html');

exports.get = req => {

    // Default rendering is a semi-serverside: client-side rendering, inserting all urls for dependencies and entries with thymeleaf from the model.
    // Add a "?pure" URL parameter to see a completely standalone client rendering, getting nothing from the controller, only using the services
    const secondary = (req.params && req.params["2"]);

    const model = (!secondary) ?
        {
            urls: [...dependencies.getAllUrls('SimpleGreeter'), `/_/service/${app.name}/react4xp/SimpleGreeter`]
        } :
        {};

    const view = (secondary) ? view1 : view2;

    return {
        body: thymeleaf.render(view, model)}
};
