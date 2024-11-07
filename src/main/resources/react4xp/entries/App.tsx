// import { toStr } from '@enonic/js-utils/value/toStr';
import {ComponentRegistry} from '@enonic/react-components';
import * as React from 'react';

import {DefaultPage} from '../DefaultPage';
import {TwoColumnsLayout} from '../TwoColumnsLayout';
import {ExamplePart} from '../ExamplePart';
import {InfoPanel} from '../InfoPanel';
import {XpComponent} from '@enonic/react-components';


const componentRegistry = new ComponentRegistry;

componentRegistry.addPage('com.enonic.app.react4xp:default', {
	View: DefaultPage
});

componentRegistry.addLayout('com.enonic.app.react4xp:twoColumns', {
	View: TwoColumnsLayout
});

componentRegistry.addPart('com.enonic.app.react4xp:example', {
	View: ExamplePart
});

componentRegistry.addMacro('info', {
	View: InfoPanel
});


export default (props) => {
	props.componentRegistry = componentRegistry;
	// console.info('App props sent to XpComponent:', toStr(props));
	return (
		<XpComponent {...props}/>
	);
}
