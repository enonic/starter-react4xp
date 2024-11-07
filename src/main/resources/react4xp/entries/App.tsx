// import { toStr } from '@enonic/js-utils/value/toStr';
import * as React from 'react';

import {XpComponent} from '@enonic/react-components';
import {componentRegistry} from '../componentRegistry';

export default (props) => {
	props.componentRegistry = componentRegistry;
	// console.info('App props sent to XpComponent:', toStr(props));
	return (
		<XpComponent {...props}/>
	);
}
