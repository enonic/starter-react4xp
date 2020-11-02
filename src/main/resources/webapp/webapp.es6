import thymeleaf from '/lib/thymeleaf';

const view = resolve('webapp.html');

exports.get = req => ({
        contentType: 'text/html',
        body: thymeleaf.render(view, {})
});
