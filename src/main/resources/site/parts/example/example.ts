import type { PartComponent } from '@enonic-types/core';
import type {Enonic} from '@enonic/js-utils/types/Request';
import type {RichTextData} from '@enonic/react-components';

// import { toStr } from './toStr';
import { render } from '/lib/enonic/react4xp';
import {getComponent} from '/lib/xp/portal';

import {componentProcessor} from '/site/controllers/componentProcessor';

type ExamplePartConfig = {
	myhtmlarea: string
}

export function get(request: Enonic.Xp.Http.Request) {
	// log.info('part controller request:%s', toStr(request));

	const component = getComponent<PartComponent<'com.enonic.app.react4xp:example', ExamplePartConfig>>();
	// log.info('part controller component:%s', toStr(component));

	const decoratedComponent = componentProcessor.process({
		component,
		// content,
		request
	});
	// log.info('Example part decoratedComponent:%s', toStr(decoratedComponent));

	const {props} = decoratedComponent;
	// log.info('Example part props:%s', toStr(props));

	const response = render(
		component,
		props,
		// React4xp Enforces SSR if a request object is not passed
		// It also Enforces SSR if request.mode is 'edit' or 'inline'
		request,
		// This is not needed when app.config['react4xp.clientRender'] === 'true'
		{
			// If your part react component doesn't use fetch or hooks you may
			// disable hydration:
			hydrate: false,

			// If you don't need Search Engines to scrape the text from your
			// part react component, you may disable server-side rendering for
			// this specific part.
			// ssr: false,

			// If you don't need any text to be scraped from any part react
			// components in this enonic xp application, you may disable
			// server-side in the application config.
			// You can still enable if for specific part react components.

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
	// log.debug('response:%s', toStr(response));

	return response;
}
