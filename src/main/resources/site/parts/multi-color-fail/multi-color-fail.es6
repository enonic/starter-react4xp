const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const clientRender = !content.page.config.SSR && !component.config.SSR

    //const colors = (component.config.colors || [])
    //    .map( c => (c || '').trim())
    //    .filter(c => !!c);

    return React4xp.render(
        "MultiColor",
        null,
        request,
        { clientRender, id: "RenderFail" }
    );
};
