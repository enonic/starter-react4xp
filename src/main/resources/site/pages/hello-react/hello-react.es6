const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');


exports.get = function(request) {
    return React4xp.render(
        portal.getComponent(),
        null,
        request,
        {
            id: "react4xpApp",
            body: `<html><body>
                <div id="react4xpApp"></div>
            </body></html>`
        }
    )
};
