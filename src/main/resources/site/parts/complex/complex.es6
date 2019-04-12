// A bit more complex: controlled config, several and nested components, both of them using ContainerGreeter (in which
// the stateful component class InnerGreeter is used) but referring to it in two different ways in the "new React4xp"
// constructor (one jsxPath reference and one via the local complex.jsx, referred through the XP component),
// inserted into a pre-rendered view where one target container has an injected ID,
// and a fixed server-side-rendering-and-hydration, independent of the request.

const portal = require('/lib/xp/portal');
const thymeleaf = require('/lib/thymeleaf');
const React4xp = require('/lib/enonic/react4xp');

const view = resolve("complex.html");

// Handle the GET request
exports.get = function(request) {

    const hardcodedId = "this-is-a-hardcoded-element-id";

    const model = {
        targetContainerIdFromController: hardcodedId
    };
    let body = thymeleaf.render(view, model);

    const localComponent = portal.getComponent();

    const reactComp = new React4xp('mySubfolder/ContainerGreeter')
        .setId(hardcodedId)
        .setProps({ greetee: localComponent.config.greetee1 });

    const importedComp = new React4xp(localComponent)
        .setProps({ greetee: localComponent.config.greetee2 })
        .setId("this-is-a-dynamic-unique-id").uniqueId(true);

    body = reactComp.renderSSRIntoContainer(body);
    let pageContributions = reactComp.renderHydrationPageContributions();

    body = importedComp.renderTargetContainer(body);
    pageContributions = importedComp.renderHydrationPageContributions(pageContributions);

    return {
        body,
        pageContributions,
    };
};
