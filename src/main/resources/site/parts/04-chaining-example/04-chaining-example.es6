// A bit more complexity: staying with the same syntax from example 3, but now creating more than one data-holding React4xp object.
// A single body and pageContributions object for the part are still rendered for the part, by
// passing data through each object's rendering functions, appending new data from each object.
//
// Other variations:
// - Combining both ways to refer to a react component: using component to refer to the local-to-the-part jsx file in
// the same folder, and jsxPath to refer to an external react component. Both these ways are done with the
// 'new React4xp' constructor.
// - Nested react components and chunking: 'mySubfolder/ContainerGreeter' is the jsxPath to the entry ContainerGreeter.jsx
// in src/main/resources/react4xp/_entries/mySubfolder. That imports InnerGreeter.jsx from src/main/resources/react4xp/myChunk,
// which means that the build will compile this into assets/react4xp:
// a mySubfolder/ContainerGreeter.js entry file, and a myChunk.<hash>.js file which contains the InnerGreeter code.
// - Component IDs are forced to be unique by adding a random postfix. This can be handy e.g. if a part uses
// several instances of the same react component.

const portal = require('/lib/xp/portal');
const thymeleaf = require('/lib/thymeleaf');
const React4xp = require('/lib/enonic/react4xp');

const view = resolve("04-chaining-example.html");

// Handle the GET request
exports.get = function(request) {

    const localComponent = portal.getComponent();

    const reactComp = new React4xp('mySubfolder/ContainerGreeter')
        .setId("this-container-exists-in-html").uniqueId(true)
        .setProps({
            greeting: localComponent.config.greeting,
            greetee: localComponent.config.greetee1
        });

    const importedComp = new React4xp(localComponent)
        .setProps({
            greeting: localComponent.config.greeting,
            greetee: localComponent.config.greetee2
        })
        .setId("this-container-does-not-exist").uniqueId(true);

    const model = {
        targetContainerIdFromController: reactComp.react4xpId
    };
    let body = thymeleaf.render(view, model);

    body = reactComp.renderSSRIntoContainer(body);
    let pageContributions = reactComp.renderHydrationPageContributions();

    body = importedComp.renderTargetContainer(body);
    pageContributions = importedComp.renderHydrationPageContributions(pageContributions);

    return {
        body,
        pageContributions,
    };
};
