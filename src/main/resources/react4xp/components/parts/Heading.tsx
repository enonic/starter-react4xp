import {Part} from '@enonic/react-components';
import React from 'react';

export const Heading = (props: any) => {

	const {componentRegistry, ...partProps} = props;
	return <Part {...partProps}>
		<h1>{props.heading}</h1>
	</Part>
};
