// FIRST EXAMPLE
//
// Minimal example, server-side rendering with hydration
// (hydration is client-side react activating a pre-rendered react component).
//
// Inserts simple, hard-coded props to the React component, and
// uses XP component (getComponent) to refer to the React component
// in the same part folder and with the same name (example.jsx)
// An ID will be auto-generated, as well as an HTML body with the
// JSX entry rendered server-side into it.

const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');


exports.get = function(request) {

    const content = portal.getContent();

    const cssUrl = portal.assetUrl({path: 'styles/better-example.css'});
    const alreadyDecidedPageContributions = {
        headEnd: `<link rel="stylesheet" type="text/css" href="${cssUrl}">`
    };

    const component = portal.getComponent();

    return React4xp.render(
        component,
        {
            pageTitle: content.displayName,
            colors: (component.config.colors || [])
                .map( c => (c || '').trim())
                .filter(c => !!c)
        },
        request,
        {
            id: "my-app",
            pageContributions: alreadyDecidedPageContributions,
            clientRender: !component.config.SSR
        }
    );
/*
    const react4xpObject = new React4xp(component)
        .setId("my-app")
        .setProps({
            pageTitle: content.displayName,
            colors: (component.config.colors || [])
                .map( c => (c || '').trim())
                .filter(c => !!c)
        });

    return {
        body: react4xpObject.renderBody(
            {
                clientRender: !component.config.SSR,
            }),

        pageContributions: react4xpObject.renderPageContributions(
            {
                pageContributions: alreadyDecidedPageContributions,
                clientRender: !component.config.SSR
            }),
    }
    */
};
