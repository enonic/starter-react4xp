var libs = {
	portal: require('/lib/xp/portal'), // Import the portal functions
	thymeleaf: require('/lib/thymeleaf'), // Import the Thymeleaf rendering function
};

// Specify the view file to use
var view = resolve('default.html');


// Handle the GET request
exports.get = function(req) {
    // Get the content that is using the page
    var content = libs.portal.getContent();    

	var mainRegion = content.page.regions.main;

    // Prepare the model that will be passed to the view
    var model = { content,  mainRegion };

    // Render the dynamic HTML with values from the model
    var body = libs.thymeleaf.render(view, model);

    // Return the response object
    return { body }
};
