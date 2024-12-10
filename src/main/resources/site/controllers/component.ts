import type {
	Component,
	Content,
	// TextComponent,
	// Controller,
	Request,
	Response
} from '@enonic-types/core';

import { toStr } from '@enonic/js-utils/value/toStr';
import { getIn } from '@enonic/js-utils/object/getIn';
import { render } from '/lib/enonic/react4xp';
import {
	getContent,
	// getComponent, // ERROR: Doesn't work with site mapped component service!
	// getSite,
} from '/lib/xp/portal';
import { dataFetcher } from '/site/controllers/dataFetcher';


const JsonResponse = (obj: Record<string, unknown>, status = 200): Response => ({
	body: JSON.stringify(obj),
	contentType: 'application/json',
	status
});


const JsonErrorResponse = (error: string, status = 400): Response => JsonResponse({error}, status);


const regionPathFromRequestPath = (path: string): string => path.replace(/^.*\/_\/component\/(.+)$/,'$1')
	.replace(/\//,'.components.')
	.replace(/\//,'.regions.')
	.replace(/\//,'.components.');

const getComponent = ({
	content = getContent(),
	request,
}: {
	content: Content;
	request: Request;
}) => {
	const {
		path: componentPath,
	} = request;
	const {page} = content;
	const regions = page['regions'] || {};
	const regionPath = regionPathFromRequestPath(componentPath);
	return getIn(regions, regionPath) as Component;
}

export function get(request: Request) {
	// log.info('ComponentUrl request:%s', toStr(request));
	log.info('ComponentUrl request:%s', toStr({
		method: request.method,
		mode: request.mode,
		params: request.params,
		url: request.url,
	}));
	const {
		branch,
		// contextPath,
		// cookies,
		mode,
		// rawPath,
		// url,
	} = request;
	// const {JSESSIONID} = cookies;

	// NOPE rawPath doesn't start with contextPath
	// const cleanPath = rawPath.substring(contextPath.length);
	// log.info('ComponentUrl cleanPath:%s', toStr(cleanPath));

    if (branch !== 'draft') {
        return JsonErrorResponse('ComponentUrl only available at the draft branch.');
    }

    if (mode === 'live') {
		return JsonErrorResponse('ComponentUrl not available in live mode.');
    }

	const content = getContent();
	// log.info('ComponentUrl content:%s', toStr(content));

	// const component = getComponent(); // ERROR: Doesn't work with site mapped component service!
	const origComponent = getComponent({
		content,
		request,
	});
	log.info('ComponentUrl origComponent:%s', toStr(origComponent));
	// const {type} = component;

	const {
		component,
		response
	} = dataFetcher.process({
		component: origComponent,
		content,
		request
	});
	if (response) {
		// log.info('app controller response:%s', toStr(response));
		return response;
	}
	log.info('ComponentUrl component:%s', toStr(component));

	// Props for BaseComponent
	const props: Record<string, unknown> = {};
	// if (type === 'text') {
	// 	props.component = component;
	// 	// props.component.text = renderableComponent.processedHtml;
	// 	props.component['props'] = {
	// 		data: renderableComponent
	// 	}
	// } else {
		props.component = component;
	// }
	log.info('ComponentUrl props:%s', toStr(props));

	// Props for ReactComponent (Part/Layout)
	// const {props} = renderableComponent;
	// log.info('ComponentUrl props:%s', toStr(props));

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
