import * as React from 'react';

import {ComponentRegistry} from '@enonic/react-components';

import {DefaultPage} from './pages/DefaultPage';
import {TwoColumnsLayout} from './layouts/TwoColumnsLayout';
import {ExamplePart} from './parts/ExamplePart';
import {InfoPanel} from './macros/InfoPanel';


export const componentRegistry = new ComponentRegistry;

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
