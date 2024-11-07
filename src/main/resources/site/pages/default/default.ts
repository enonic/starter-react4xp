/** Simple page controller, as an example of how to render an XP page with Regions, using only server-side React.
 *
 *  NOTE:   Parts and layouts rendered with react4xp DO NOT need a page controller like this to work. Putting react4xp-
 *          rendered XP components inside regions in a thymeleaf-rendered page controller (or hardcoded, etc) is
 *          perfectly fine. This is just a demo of how to do it if you need to make the page controller in react4xp.
 */
import type { Enonic } from '@enonic/js-utils/types/Request';
// import type { PageComponentProps } from './default.d';
// import { toStr } from '@enonic/js-utils/value/toStr';
import { getContent } from '/lib/xp/portal';
import { render } from '/lib/enonic/react4xp';
import { componentProcessor } from '/site/controllers/componentProcessor';


export function get(request: Enonic.Xp.Http.Request) {
	// log.info('page controller request:%s', toStr(request));

	const content = getContent();
	// log.debug('content:%s', toStr(content));
	const {page: component} = content;

	const decoratedComponent = componentProcessor.process({
		component,
		content,
		request
	});
	// log.info('default page decoratedComponent:%s', toStr(decoratedComponent));

	const props = decoratedComponent;
	// log.info('default page props:%s', toStr(props));

	const react4xpId = `react4xp_${content._id}`;

	const htmlBody = `<!DOCTYPE html><html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>${content.displayName}</title>
	</head>
	<body class="xp-page">
		<div id="${react4xpId}"></div>
	</body>
</html>`;

	const output = render(
		component,
		props,
		// React4xp Enforces SSR if a request object is not passed
		// It also Enforces SSR if request.mode is 'edit'
		request,
		{
			body: htmlBody,

			// If your page react component doesn't use fetch or hooks you may
			// disable hydration:
			hydrate: false,

			// Client-side rendering of page isn't fully supported yet.
			// Therefore the default is SSR with hydration even when
			// app.config['react4xp.ssr'] === 'false'
			// You can still try it out by disabling SSR here:
			// ssr: false,

			id: react4xpId,

			// Generate server relative urls or fully qualified urls.
			// Will use what is set here:
			// urlType: 'absolute'
			// urlType: 'server'
			// Or in application config:
			// # react4xp.urlType = absolute
			// # react4xp.urlType = server
			// Or fallback to the default, which is 'server'
		}
	);

	return output;
}
