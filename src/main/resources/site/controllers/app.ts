import type { Request, Response } from '@enonic-types/core';
import type { AppProps } from '/types/AppProps';

import { toStr } from '@enonic/js-utils/value/toStr';
import { getContent } from '/lib/xp/portal';
// import { assetUrl } from '/lib/enonic/asset';
// // @ts-expect-error no types
// import { getFingerprint } from '/lib/enonic/asset/runMode';
// import { assetUrl } from '/lib/enonic/react4xp';
import { render } from '/lib/enonic/react4xp';
import { dataFetcher } from '/site/controllers/dataFetcher';

export function get(request: Request): Response {
	// log.info('app controller request:%s', toStr(request));
	log.info('app controller request:%s', toStr({
		method: request.method,
		mode: request.mode,
		params: request.params,
		url: request.url,
	}));

	const content = getContent();
	// log.info('app controller content:%s', toStr(content));

	const {
		component,
		pageContributions,
		response
	} = dataFetcher.process({
		// component, // gotten from content inside DataFetcher
		content, // Since it's already gotten, pass it along, so DataFetcher doesn't have to get it again.
		request
	});
	if (response) {
		// log.info('app controller response:%s', toStr(response));
		return response; // This also handles the special case when ContentStudio needs 418.
	}
	// log.info('app controller component:%s', toStr(component));

	const props: AppProps = {
		component
	}
	// log.info('app controller props:%s', toStr(props));

	const react4xpId = `react4xp_${content._id}`;

	const htmlBody = `<!DOCTYPE html><html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>${content.displayName}</title>
	</head>
	<body>
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

			// If none of your react components are interactive,
			// you may disable hydration:
			// hydrate: false,

			// If you only want client-side rendering,
			// you can disable server-side rendering here:
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

			pageContributions/*: {
				headEnd: [
							`<link rel="stylesheet" href="${assetUrl({
								application: 'com.enonic.app.panelmacros',
								path: 'css/panel.css',
							})}" type="text/css" />`
								// .replace(app.name, 'com.enonic.app.panelmacros')
								.replace(/css\/panel\.css/, `${getFingerprint('com.enonic.app.panelmacros')}/css/panel.css`)
						]
			}*/
		}
	);

	// const {
	// 	body,
	// 	pageContributions,
	// 	status,
	// 	...rest
	// } = output;
	// log.info('app controller body:%s', output.body);
	// log.info('app controller body:%s', format(body, "  ", 80));
	// log.info('app controller body:%s', toDiffableHtml(body));

	// NOPE drags in entities with Uint16Array
	// const tree = fromHtml(body);
	// format(tree);
	// const formattedBody = toHtml(tree);
	// log.info('app controller body:%s', formattedBody);

	// log.info('app controller pageContributions:%s', toStr(pageContributions));
	// log.info('app controller rest:%s', toStr(rest));
	return output;
}
