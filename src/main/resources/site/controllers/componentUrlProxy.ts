import type {
	Component,
	// TextComponent,
	// Controller,
	Request,
	Response
} from '@enonic-types/core'

import { toStr } from '@enonic/js-utils/value/toStr';
import { getIn } from '@enonic/js-utils/object/getIn';
import { render } from '/lib/enonic/react4xp';
import {
	getContent,
	// getComponent, // ERROR: Doesn't work with site mapped component service!
	// getSite,
} from '/lib/xp/portal';
import { componentProcessor } from '/site/controllers/componentProcessor';


const JsonResponse = (obj: Record<string, unknown>, status = 200): Response => ({
	body: JSON.stringify(obj),
	contentType: 'application/json',
	status
});


const JsonErrorResponse = (error: string, status = 400): Response => JsonResponse({error}, status);


export function get(request: Request) {
	// log.info('ComponentUrlProxy request:%s', toStr(request));
	const {
		branch,
		// contextPath,
		// cookies,
		mode,
		path,
		// rawPath,
		// url,
	} = request;
	// const {JSESSIONID} = cookies;

	// NOPE rawPath doesn't start with contextPath
	// const cleanPath = rawPath.substring(contextPath.length);
	// log.info('ComponentUrlProxy cleanPath:%s', toStr(cleanPath));

    if (branch !== 'draft') {
        return JsonErrorResponse('ComponentUrlProxy only available at the draft branch.');
    }

    if (mode === 'live') {
		return JsonErrorResponse('ComponentUrlProxy not available in live mode.');
    }

	const componentPath = path.replace(/^.*\/_\/component\/(.+)$/,'$1')
		.replace(/\//,'.components.')
		.replace(/\//,'.regions.')
		.replace(/\//,'.components.');
	// log.info('ComponentUrlProxy componentPath:%s', toStr(componentPath));

	const content = getContent();
	// log.info('ComponentUrlProxy content:%s', toStr(content));

	const {page} = content;
	const {regions} = page;

	// const component = getComponent(); // ERROR: Doesn't work with site mapped component service!
	const component = getIn(regions, componentPath) as Component;
	log.info('ComponentUrlProxy component:%s', toStr(component));
	// const {type} = component;

	const decoratedComponent = componentProcessor.process({
		component,
		content,
		request
	});
	log.info('ComponentUrlProxy decoratedComponent:%s', toStr(decoratedComponent));

	// Props for XpComponent
	const props: Record<string, unknown> = {};
	// if (type === 'text') {
	// 	props.component = component;
	// 	// props.component.text = decoratedComponent.processedHtml;
	// 	props.component['props'] = {
	// 		data: decoratedComponent
	// 	}
	// } else {
		props.component = decoratedComponent;
	// }
	log.info('ComponentUrlProxy props:%s', toStr(props));

	// Props for ReactComponent (Part/Layout)
	// const {props} = decoratedComponent;
	// log.info('ComponentUrlProxy props:%s', toStr(props));

	// const site = getSite();

	const react4xpId = `react4xp_${content._id}`;
	const output = render(
		// src/main/resources/react4xp/entries/App.tsx
		// build/resources/main/r4xAssets/App-{hash}.js
		'App',

		props,
		// React4xp Enforces SSR if a request object is not passed
		// It also Enforces SSR if request.mode is 'edit'
		request,
		{
			body: `<div id="${react4xpId}"></div>`,

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

// export const all = get;
// export const post = get;
// export const options = get;
// export const handleError = get;
