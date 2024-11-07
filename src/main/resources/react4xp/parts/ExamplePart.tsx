import type {
	ComponentRegistry,
	RichTextData
} from '@enonic/react-components';

import './example.sass';
import * as React from 'react';
import {RichText} from '@enonic/react-components';

export interface ExampleProps {
	data: RichTextData;
	componentRegistry?: ComponentRegistry;
}

export function ExamplePart({
	componentRegistry,
	data
}: ExampleProps) {
	// console.info('ExamplePart data', data);
	if (!data) {
		return <div>Example Part: Please fill in the htmlArea.</div>;
	}
	return (
		<div data-portal-component-type="part">
			<RichText
				componentRegistry={componentRegistry}
				data={data}
			/>
		</div>
	);
}
