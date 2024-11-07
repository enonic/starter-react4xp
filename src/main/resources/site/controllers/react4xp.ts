import { toStr } from '@enonic/js-utils/value/toStr';
import {get as getContentByKey} from '/lib/xp/content';
import {
	getComponent as getComponentSchema,
	listSchemas
} from '/lib/xp/schema';
import {
	getContent,
	processHtml,
} from '/lib/xp/portal';
import { render } from '/lib/enonic/react4xp';

import {ComponentProcessor} from '@enonic/react-components/processComponents';

const componentProcessor = new ComponentProcessor({
	getComponentSchema,
	getContentByKey,
	listSchemas,
	processHtml
});

componentProcessor.addPart('com.enonic.app.react4xp:example', {
	toProps: ({
		component,
		content,
		processedConfig,
		request,
	}) => {
		// log.info('part toProps:%s', toStr({ component, content, processedConfig, request }));
		return {
			data: processedConfig.anHtmlArea
		};
	}
});

componentProcessor.addLayout("com.enonic.app.react4xp:twoColumns", {
	toProps: ({
		component,
		content,
		processedComponent,
		processedConfig,
		request,
	}) => {
		// log.info('layout toProps:%s', toStr({ component, content, processedConfig, request }));
		const {regions} = processedComponent;
		// const {mode} = request;
		// log.info('mode:%s', mode);
		if (!regions.left) {
			regions.left = {
				components: []
			};
		}
		if (!regions.right) {
			regions.right = {
				components: []
			};
		}
		return {
			// data: processedConfig.anHtmlArea,
			regions
		};
	},
});

componentProcessor.addPage("com.enonic.app.react4xp:default", {
	toProps: ({
		component,
		content,
		processedComponent,
		processedConfig,
		request,
	}) => {
		// log.info('page toProps:%s', toStr({
		// 	component,
		// 	// content,
		// 	// processedConfig,
		// 	// request,
		// }));
		const {regions} = processedComponent;
		// const {mode} = request;
		if (!regions.main) {
			regions.main = {
				components: []
			};
		}
		processedComponent.props = { // The props that DefaultPage will receive
			regions
		}
		return { // The props that XpComponent will receive
			component: processedComponent,
		};
	},
});

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

	return output;
}
