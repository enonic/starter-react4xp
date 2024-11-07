import { toStr } from '@enonic/js-utils/value/toStr';
// import {get as getContentByKey} from '/lib/xp/content';
// import {
// 	getComponent as getComponentSchema,
// 	listSchemas
// } from '/lib/xp/schema';
import {
	getContent,
	// processHtml,
} from '/lib/xp/portal';
import { render } from '/lib/enonic/react4xp';
// import toDiffableHtml from 'diffable-html'; // requires stream
import {componentProcessor} from '/site/controllers/componentProcessor';
// import format from "html-format"; // SyntaxError: Unsupported RegExp flag: y

// NOPE drags in entities with Uint16Array
// import {format} from 'hast-util-format'
// import {fromHtml} from 'hast-util-from-html'
// import {toHtml} from 'hast-util-to-html'

export function get(request) {
	// log.info('react4xp controller request:%s', toStr(request));

	const content = getContent();
	// log.info('react4xp controller content:%s', toStr(content));

	const {
		fragment,
		page
	} = content;

	const component = page || fragment;

	const decoratedComponent = componentProcessor.process({
		component,
		content,
		request
	});
	// log.info('react4xp controller decoratedComponent:%s', toStr(decoratedComponent));

	const {props} = decoratedComponent;
	// log.info('react4xp controller props:%s', toStr(props));

	const react4xpId = `react4xp_${content._id}`;

	const htmlBody = `<!DOCTYPE html><html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>${content.displayName}</title>
	</head>
	<body class="xp-page" data-portal-component-type="page">
		<div id="${react4xpId}"></div>
	</body>
</html>`;

	const output = render(
		// src/main/resources/react4xp/entries/App.tsx
		// build/resources/main/r4xAssets/App-{hash}.js
		'App',

		props,
		// React4xp Enforces SSR if a request object is not passed
		// It also Enforces SSR if request.mode is 'edit'
		request,
		{
			body: htmlBody,

			// If your page react component doesn't use fetch or hooks you may
			// disable hydration:
			hydrate: false,
			// hydrate: true, // TODO: Error: Hydration failed because the initial UI does not match what was rendered on the server.

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

	const {
		body,
		pageContributions,
		status,
		...rest
	} = output;
	log.info('react4xp controller body:%s', body);
	// log.info('react4xp controller body:%s', format(body, "  ", 80));
	// log.info('react4xp controller body:%s', toDiffableHtml(body));

	// NOPE drags in entities with Uint16Array
	// const tree = fromHtml(body);
	// format(tree);
	// const formattedBody = toHtml(tree);
	// log.info('react4xp controller body:%s', formattedBody);

	// log.info('react4xp controller pageContributions:%s', toStr(pageContributions));
	// log.info('react4xp controller rest:%s', toStr(rest));
	return output;
}
