import thymeleaf from '/lib/thymeleaf';

const view = resolve('webapp.html');

exports.get = req => {
    const model = {
        sitePath:  "/moviesite",
        movieType: `${app.name}:movie`
    };

    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, model)
    };
};
