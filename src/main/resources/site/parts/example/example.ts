import type {Enonic} from '@enonic/js-utils/types/Request';
// import { toStr } from '@enonic/js-utils/value/toStr';
import { render } from '/lib/enonic/react4xp';
import { getComponent } from '/lib/xp/portal';


export function get(request: Enonic.Xp.Http.Request) {
	// log.debug('request:%s', toStr(request));

	const component = getComponent();

	const props = {};

	return render(
		component,
		props,
		// React4xp Enforces SSR if a request object is not passed
		// It also Enforces SSR if request.mode is 'edit' or 'inline'
		request,
		// This is not needed when app.config['react4xp.clientRender'] === 'true'
		// {
		// 	clientRender: true // default is false, which means SSR
		// }
	);
}
