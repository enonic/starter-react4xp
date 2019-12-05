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
const thymeleaf = require('/lib/thymeleaf');

const view = resolve('./better-example.html');
const alreadyRenderedView = thymeleaf.render(view, {});

const alreadyDecidedPageContributions = {
    headEnd: '<style>' +
        '</style>'
};

exports.get = function(request) {

    const component = portal.getComponent();

    const react4xpObject = new React4xp(component)
        .setId("my-app")
        .setProps({
            colors: (component.config.colors || [])
                .map( c => (c || '').trim())
                .filter(c => !!c)
        });

    return {
        body: react4xpObject.renderBody({
            body: alreadyRenderedView,
            clientRender: !component.config.SSR,
        }),
        pageContributions: react4xpObject.renderPageContributions({
            pageContributions: alreadyDecidedPageContributions,
            clientRender: !component.config.SSR
        }),
    }
};
