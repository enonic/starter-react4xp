import type { Enonic } from '@enonic/js-utils/types/Request';
import type { Regions } from '@enonic/react-components';
// import { toStr } from '@enonic/js-utils/value/toStr';
import { render } from '/lib/enonic/react4xp';
import { getComponent } from '/lib/xp/portal';


export function get(request: Enonic.Xp.Http.Request) {
	// log.debug('request:%s', toStr(request));

	const component = getComponent();
	// log.debug('component:%s', toStr(component));

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
		// It also Enforces SSR if request.mode is 'edit' or 'inline'
		request,
		// {
		// 	// Defaults to SSR for layouts even when
		// 	// app.config['react4xp.clientRender'] === 'true'
		// 	// clientRender: true // client-side rendering of layouts aren't supported yet
		// }
	);
} // get
