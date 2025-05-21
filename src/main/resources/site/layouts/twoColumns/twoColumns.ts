import type { Request } from '@enonic-types/core';
import type { Regions } from '@enonic/react-components';
import { render } from '/lib/enonic/react4xp';
import { getComponent } from '/lib/xp/portal';


export function get(request: Request) {
	// log.debug('request:%s', toStr(request));

	const component = getComponent();
	// log.debug('component:%s', toStr(component));

	if (component.type !== 'layout') {
		throw new Error(`Expected a layout component, but got ${component.type}`);
	}

	const props: Parameters<typeof Regions>[0] = {
		classes: true,
		names: ['left', 'right'],
		regionsData: component.regions,
		tags: 'section',
	};

	return render(
		component,
		props,
		// React4xp Enforces SSR if a request object is not passed
		// It also Enforces SSR if request.mode is 'edit'
		request,
		{
			// If your layout react component doesn't use fetch or hooks you may
			// disable hydration:
			hydrate: false,

			// Client-side rendering of layout isn't fully supported yet.
			// Therefore the default is SSR even when
			// app.config['react4xp.ssr'] === 'false'
			// You can still try it out by disabling SSR here:
			// ssr: false,

			// Generate server relative urls or fully qualified urls.
			// Will use what is set here:
			// urlType: 'absolute'
			// urlType: 'server'
			// Or in application config:
			// app.config['react4xp.urlType'] === 'absolute'
			// app.config['react4xp.urlType'] === 'server'
			// Or fallback to the default, which is 'server'
		}
	);
} // get
