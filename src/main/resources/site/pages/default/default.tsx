import type {DefaultPageProps} from '../../../react4xp/DefaultPage';


import {ComponentRegistry} from '@enonic/react-components';
import * as React from 'react';

import {DefaultPage} from '../../../react4xp/DefaultPage';
import {ExamplePart} from '../../../react4xp/ExamplePart';
import {InfoPanel} from '../../../react4xp/InfoPanel';
import {TwoColumnsLayout} from '../../../react4xp/TwoColumnsLayout';


const componentRegistry = new ComponentRegistry;

componentRegistry.addMacro('info', {
	View: InfoPanel
});

componentRegistry.addPart('com.enonic.app.react4xp:example', {
	View: ExamplePart
});

componentRegistry.addLayout('com.enonic.app.react4xp:twoColumns', {
	View: TwoColumnsLayout
});


export default (props: DefaultPageProps) => {
	props.componentRegistry = componentRegistry;
	return (
		<DefaultPage {...props}/>
	);
}
