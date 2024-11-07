import type {ExampleProps} from '../../../react4xp/parts/ExamplePart';

// import {XpComponent} from '@enonic/react-components';
import * as React from 'react';
import {ExamplePart} from '../../../react4xp/parts/ExamplePart';
import {componentRegistry} from '../../../react4xp/componentRegistry';

export default (props: ExampleProps) => {
	const propsWithComponentRegistry = props;
	props.componentRegistry = componentRegistry;
	return (
		<>
			<h1>src/main/resources/site/parts/example/example.tsx</h1>
			<ExamplePart {...propsWithComponentRegistry}/>
			{/* <XpComponent {...props}/> */}
		</>
	);
}
