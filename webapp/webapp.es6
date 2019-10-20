// Two standalone (independent of XP components) webapps in one:
//
// <domain:port>/app/<app-key> demonstrates the use of inserted.html that gets an array <urls> from this controller,
// which contains all required URLs for rendering, and uses thymeleaf to insert them into the page.
//
// <domain:port>/app/<app-key>?pure is standalone, doesn't get any data from this controller, but resolves its own URLs.
// This is done using XP's view functions in this case, but the URLs can strictly speaking come from any source - the
// important thing is to point to the React4xp services.
//
// (depending on your setup <domain:port>/app/<app-key> can be e.g. http://localhost:8080/app/com.enonic.app.react4xp )

const thymeleaf = require('/lib/thymeleaf');
const portal = require('/lib/xp/portal');

const dependencies = require('/lib/enonic/react4xp/dependencies');

const viewPure = resolve('pure.html');
const viewInserted= resolve('inserted.html');

exports.get = req => {

    // Default rendering is a semi-serverside: client-side rendering, inserting all urls for dependencies and entries with thymeleaf from the model.
    // Add a "?pure" URL parameter to see a completely standalone client rendering, getting nothing from the controller, only using the services
    const pure = (req.params && req.params.pure != null && req.params.pure != "false");

    // Without a "?pure" parameter, some dependency URLs are inserted:
    const model = (!pure) ?
        { urls: [
            ...dependencies.getAllUrls('ColorThing'),
            portal.serviceUrl({service: 'react4xp/ColorThing'})
        ]} :
        {};

    // Decides the HTML view depending on the "?pure" parameter.
    const view = (pure) ? viewPure : viewInserted;

    return {
        body: thymeleaf.render(view, model)}
};
