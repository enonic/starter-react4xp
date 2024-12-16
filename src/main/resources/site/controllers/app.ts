import type { Request, Response } from '@enonic-types/core';
import type { AppProps } from '/types/AppProps';

import { getContent } from '/lib/xp/portal';
import { render } from '/lib/enonic/react4xp';
import { dataFetcher } from '/site/controllers/dataFetcher';

export function get(request: Request): Response {
	const content = getContent();
	const {
		component,
		response
	} = dataFetcher.process({
		content, // Since it's already gotten, pass it along, so DataFetcher doesn't have to get it again.
		request,
	});
	if (response) {
		return response; // This also handles the special case when ContentStudio needs 418.
	}
	const props: AppProps = {
		component
	}
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
		'App',
		props,
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
		}
	);

	return output;
}
