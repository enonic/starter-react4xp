/** Simple page controller, as an example of how to render an XP page with Regions, using only server-side React.
 *
 *  NOTE:   Parts and layouts rendered with react4xp DO NOT need a page controller like this to work. Putting react4xp-
 *          rendered XP components inside regions in a thymeleaf-rendered page controller (or hardcoded, etc) is
 *          perfectly fine. This is just a demo of how to do it if you need to make the page controller in react4xp.
 */
import type { Enonic } from '@enonic/js-utils/types/Request';
import type { PageComponentProps } from './default.d';
import { toStr } from '@enonic/js-utils/value/toStr';
import { getContent } from '/lib/xp/portal';
import { render } from '/lib/enonic/react4xp';


export function get(request: Enonic.Xp.Http.Request) {
	const content = getContent();
	// log.debug('content:%s', toStr(content));

	const {page: entry} = content;
	// log.debug('entry:%s', toStr(entry));

	const react4xpId = `react4xp_${content._id}`;

	const props: PageComponentProps = {
		regionsData: content.page.regions,
		names: "main",
		tag: "main",
	};

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
		entry,
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
		}
	);

	return output;
}
