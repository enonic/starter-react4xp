import type { Enonic } from '@enonic/js-utils/types/Request';
// import { toStr } from '@enonic/js-utils/value/toStr';
import { render } from '/lib/enonic/react4xp';
import { getComponent } from '/lib/xp/portal';
import { componentProcessor } from '/site/controllers/componentProcessor';


export function get(request: Enonic.Xp.Http.Request) {
	// log.debug('request:%s', toStr(request));

	const component = getComponent();
	// log.info('component:%s', toStr(component));

	const decoratedComponent = componentProcessor.process({
		component,
		// content,
		request
	});
	// log.info('TwoColumn layout decoratedComponent:%s', toStr(decoratedComponent));

	const props = decoratedComponent;

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
