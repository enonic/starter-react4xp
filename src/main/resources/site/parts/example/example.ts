import type {Enonic} from '@enonic/js-utils/types/Request';
import { toStr } from './toStr';
import { render } from '/lib/enonic/react4xp';
import { getComponent } from '/lib/xp/portal';


export function get(request: Enonic.Xp.Http.Request) {
	// log.debug('request:%s', toStr(request));

	const component = getComponent();
	log.debug('component:%s', toStr(component));

	const props = {};

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
			// hydrate: false,

			// If you don't need Search Engines to scrape the text from your
			// part react component, you may disable server-side rendering for
			// this specific part.
			// ssr: false,

			// If you don't need any text to be scraped from any part react
			// components in this enonic xp application, you may disable
			// server-side in the application config.
			// You can still enable if for specific part react components.
		}
	);
	// log.debug('response:%s', toStr(response));

	return response;
}
