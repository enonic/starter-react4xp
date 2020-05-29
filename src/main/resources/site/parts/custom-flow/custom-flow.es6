const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');
const thymeleaf = require('/lib/thymeleaf');

const view = resolve('custom-flow-view.html');


exports.get = function(request) {
    // Fetching data from the part config:
    const component = portal.getComponent();
    const partConfig = (component || {}).config || {};



    // Setting up the data-holding object for hello-react.jsx:
    const helloObj = new React4xp(`site/pages/hello-react/hello-react`);
    helloObj
        .setProps({
            message: partConfig.greeting,
            messageTarget: partConfig.greetee,
            droppableThing: partConfig.things,
            initialCount: partConfig.startCount
        })


    // Setting up colorObj, the data-holding object for color.jsx:
    const colorObj = new React4xp(`site/parts/color/color`);
    colorObj
        .setProps({ color: partConfig.color })
        .setId("myColorThing")
        .uniqueId()


    // Using thymeleaf to render container HTML, into which colorObj will be rendered:
    const thymeleafModel = {
        color: colorObj.props.color,
        targetId: colorObj.react4xpId
    }
    const colorSectionContainer = thymeleaf.render(view, thymeleafModel);


    // Determining if the rendering context is not inside Content Studio:
    const isOutsideContentStudio = request.mode === 'live' || request.mode === 'preview';
    

    const colorBody = colorObj.renderBody({
        body: colorSectionContainer
    });
    // Adding an extra page contribution, just for demonstrating that they can be passed through here too:
    const colorPageContributions = colorObj.renderPageContributions({
        pageContributions: {
            bodyEnd: `<script>console.log('Created: ${colorObj.props.color} thing.');</script>`
        }
    });

    const finalBody = helloObj.renderBody({
        body: colorBody
    });
    const finalPageContributions = helloObj.renderPageContributions({
        pageContributions: colorPageContributions
    })

    return {
        body: finalBody,
        pageContributions: isOutsideContentStudio ? finalPageContributions : undefined
    }
};
