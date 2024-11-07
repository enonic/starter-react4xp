// import type {Region} from '@enonic-types/core';
// import type {TwoColumnsLayoutProps} from '../../../react4xp/TwoColumnsLayout';
import type {InfoPanelProps} from '../../../react4xp/macros/InfoPanel';

import {ComponentRegistry} from '@enonic/react-components';
import * as React from 'react';
import {ExamplePart} from '../../../react4xp/parts/ExamplePart';
import {InfoPanel} from '../../../react4xp/macros/InfoPanel';
import {TwoColumnsLayout} from '../../../react4xp/layouts/TwoColumnsLayout';

const componentRegistry = new ComponentRegistry;

componentRegistry.addMacro<InfoPanelProps>('info', {
	View: InfoPanel
});

componentRegistry.addPart('com.enonic.app.react4xp:example', {
	View: ExamplePart
});

export default (props/*: TwoColumnsLayoutProps*/) => {
	props.componentRegistry = componentRegistry;
	return (
		<TwoColumnsLayout {...props}/>
	);
};

// export default () => <div>Two column layout</div>;
