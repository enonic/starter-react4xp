const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const clientRender = !content.page.config.SSR;
    const req = content.page.config.req ? request : undefined;

    const colors = (component.config.colors || [])
        .map( c => (c || '').trim())
        .filter(c => !!c);

    const multiColorObj = new React4xp('MultiColor2')
        .setProps({colors})
        .setId('Multi-Color-2-With-Custom-No-Request')
        .uniqueId();

    const body = multiColorObj.renderBody({clientRender, request: req});
    const pageContributions = multiColorObj.renderPageContributions({clientRender, request: req});

    return {body, pageContributions};
};
