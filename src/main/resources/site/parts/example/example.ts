import { render } from '/lib/enonic/react4xp';
import { getComponent } from '/lib/xp/portal';

export function get() {
	const component = getComponent();

	const props = {};

	return render(
		component,
		props,
		{},
		{
			clientRender: true
		}
	);
}
