// A bit more complex: controlled config, several and nested components, one of which is a stateful class component,
// inserted into a pre-rendered view where one target container has an injected ID,
// and a fixed server-side-rendering-and-hydration, independent of the request

const portal = require('/lib/xp/portal');
const thymeleaf = require('/lib/thymeleaf');
const React4xp = require('/lib/enonic/react4xp');

const view = resolve("complex.html");

// Handle the GET request
exports.get = function(request) {

    const model = {
        targetContainerIdFromController: "this-is-where-to-put-the-imported-component"
    };
    let body = thymeleaf.render(view, model);

    const localComponent = portal.getComponent();

    const reactComp = new React4xp('ContainerGreeter')
        .setId(model.targetContainerIdFromController)
        .setProps({ greetee: localComponent.config.greetee });

    const importedComp = new React4xp(localComponent)
        .setProps({ greetee: localComponent.config.greetee2 })
        .setId("this-is-unique").uniqueId(true);

    body = reactComp.renderSSRIntoContainer(body);
    let pageContributions = reactComp.renderHydrationPageContributions();

    body = importedComp.renderTargetContainer(body);
    pageContributions = importedComp.renderHydrationPageContributions(pageContributions);

    return {
        body,
        pageContributions,
    };
};
