import thymeleaf from '/lib/thymeleaf';

const view = resolve('webapp.html');

exports.get = req => {
    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, {})
    };
};
