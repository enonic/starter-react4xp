const portal = require('/lib/xp/portal');
const thymeleaf = require('/lib/thymeleaf');

var view = resolve('default.html');


exports.get = function(req) {
    const content = portal.getContent();

    const model = {
        mainRegion: content.page.regions.main,
        title: content.displayName
    };

    return {
        body: thymeleaf.render(view, model)
    }
};
