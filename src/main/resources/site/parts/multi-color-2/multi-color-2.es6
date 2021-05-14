const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const isInsideContentStudio = request.mode === 'edit' || request.mode === 'inline';
    const clientRender = !content.page.config.SSR && !component.config.SSR && !isInsideContentStudio;

    const colors = (component.config.colors || [])
        .map( c => (c || '').trim())
        .filter(c => !!c);

    const multiColorObj = new React4xp('MultiColor2')
        .setProps({colors})
        .setId('Moolteecollertoo')
        .uniqueId();

    const body = multiColorObj.renderBody({clientRender});
    const pageContributions = multiColorObj.renderPageContributions({
        clientRender,
        suppressJS: isInsideContentStudio});

    return {body, pageContributions};
};
