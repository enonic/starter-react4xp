import type {ExampleProps} from '../../../react4xp/ExamplePart';
import type {InfoPanelProps} from '../../../react4xp/InfoPanel';

import './example.sass';
import * as React from 'react';
import {ComponentRegistry} from '@enonic/react-components';

import {ExamplePart} from '../../../react4xp/ExamplePart';
import {InfoPanel} from '../../../react4xp/InfoPanel';

const componentRegistry = new ComponentRegistry;

componentRegistry.addMacro<InfoPanelProps>('info', {
	View: InfoPanel
});

export default (props: ExampleProps) => {
	const propsWithComponentRegistry = props;
	props.componentRegistry = componentRegistry;
	return <ExamplePart {...propsWithComponentRegistry}/>;
}
