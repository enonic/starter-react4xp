import type {
	ComponentRegistry,
	RichTextData
} from '@enonic/react-components';

import './example.sass';
import * as React from 'react';
import {
	RichText,
	XpPart,
} from '@enonic/react-components';

export interface ExampleProps {
	data: RichTextData;
	componentRegistry?: ComponentRegistry;
}

export function ExamplePart({
	componentRegistry,
	data
}: ExampleProps) {
	const [text, setText] = React.useState('initial state');
	React.useEffect(()=> {
		// console.info('ExamplePart useEffect');
		setText('useEffect state');
	}, [])
	// console.info('ExamplePart data', data);
	if (!data) {
		return <div>Example Part: Please fill in the htmlArea.</div>;
	}
	return (
		<XpPart
			as='part'
		>
			<p>{text}</p>
			<RichText
				componentRegistry={componentRegistry}
				data={data}
			/>
		</XpPart>
	);
}
