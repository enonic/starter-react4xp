import contentLib from '/lib/xp/content';
import thymeleaf from '/lib/thymeleaf';

const view = resolve('webapp.html');

const SITE_ID = '6e3f95c8-20f6-45f4-a38b-1b46d0780579'                               // Parent item of the movies

exports.get = req => {

    const { _path, _name } = contentLib.getSite({key: SITE_ID});

    const model = {
        parentPath: _path,
        apiUrl: `http://localhost:8080/site/default/master/${_name}/api/headless`,
        movieType: `${app.name}:movie`  // --> "com.enonic.app.react4xp:movie" or similar
    };

    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, model)
    };
};

