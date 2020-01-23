const portal = require('/lib/xp/portal');
const thymeleaf = require('/lib/thymeleaf');

// Specify the view file to use
var view = resolve('default.html');


// Handle the GET request
exports.get = function(req) {
    // Get the content that is using the page
    const content = portal.getContent();

	const mainRegion = content.page.regions.main;

    // Prepare the model that will be passed to the view
    const model = { content,  mainRegion };

    // Render the dynamic HTML with values from the model
    const body = thymeleaf.render(view, model);

    // Return the response object
    return { body }
};
