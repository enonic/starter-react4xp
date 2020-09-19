import contentLib from '/lib/xp/content';
import portalLib from '/lib/xp/portal';
import thymeleaf from '/lib/thymeleaf';

const view = resolve('webapp.html');

const SITE = '/moviesite'                               // Parent item of the movies

exports.get = req => {

    const { _id } = contentLib.getSite({key: SITE});

    const model = {
        contentId: _id,
        apiUrl: `${ portalLib.pageUrl({ id: _id, type: `absolute` }) }/api/guillotine`,
        movieType: `${app.name.replace(/\./g, '_')}_Movie`                                         // --> "com_enonic_app_react4xp_Movie" or similar
    };


    log.info("model (" +
    	(Array.isArray(model) ?
    		("array[" + model.length + "]") :
    		(typeof model + (model && typeof model === 'object' ? (" with keys: " + JSON.stringify(Object.keys(model))) : ""))
    	) + "): " + JSON.stringify(model, null, 2)
    );  //*/

    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, model)
    };
};
