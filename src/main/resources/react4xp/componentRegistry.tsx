import * as React from 'react';
import { ComponentRegistry } from '@enonic/react-components';
import { DefaultPage } from './pages/DefaultPage';
import { TwoColumnsLayout } from './layouts/TwoColumnsLayout';
import { ExamplePart } from './parts/ExamplePart';
import {
	DefaultPanel,
	ErrorPanel,
	InfoPanel,
	NotePanel,
	SuccessPanel,
} from './macros/PanelMacros';

export const componentRegistry = new ComponentRegistry;
componentRegistry.addPage('com.enonic.app.react4xp:default', { View: DefaultPage });
componentRegistry.addLayout('com.enonic.app.react4xp:twoColumns', { View: TwoColumnsLayout });
componentRegistry.addPart('com.enonic.app.react4xp:example', { View: ExamplePart });
componentRegistry.addMacro('panel', { View: DefaultPanel });
componentRegistry.addMacro('error', { View: ErrorPanel });
componentRegistry.addMacro('info', { View: InfoPanel });
componentRegistry.addMacro('note', { View: NotePanel });
componentRegistry.addMacro('success', { View: SuccessPanel });
