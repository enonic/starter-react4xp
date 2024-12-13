// import type {
// 	LiteralUnion,
// 	RequestMode,
// } from '@enonic-types/core';
import type {
	ComponentRegistry,
	RichTextData
} from '@enonic/react-components';

import './example.sass';
import * as React from 'react';
import {
	RichText,
	Part,
} from '@enonic/react-components';

type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);
type XpRequestMode = 'edit' | 'inline' | 'live' | 'preview' | 'admin';

export interface ExampleProps {
	componentRegistry?: ComponentRegistry;
	mode: LiteralUnion<XpRequestMode>;
	myHtmlArea: RichTextData;
}

export function ExamplePart(props: ExampleProps) {
	const [text, setText] = React.useState('initial state');
	React.useEffect(()=> {
		// console.info('ExamplePart useEffect');
		setText('useEffect state');
	}, []);
	const {
		componentRegistry,
		mode,
		myHtmlArea,
		...autoProps
	} = props;
	// console.info('ExamplePart data', data);
	if (!myHtmlArea) {
		return <div>Example Part: Please fill in the htmlArea.</div>;
	}
	return (
		<Part
			// Needed by BasePart to add
			// data-portal-component-type='part'
			// when request.mode === 'edit'.
			{...autoProps}

			as='part'
			className='example-part'
		>
			<p>{text}</p>
			<RichText
				componentRegistry={componentRegistry}
				data={myHtmlArea}
				mode={mode}
			/>
		</Part>
	);
}
