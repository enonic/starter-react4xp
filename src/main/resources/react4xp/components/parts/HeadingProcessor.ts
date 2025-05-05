import {PartComponent} from '@enonic-types/core';
import type {ComponentProcessorFunction} from '@enonic-types/lib-react4xp/DataFetcher';

export const headingProcessor: ComponentProcessorFunction<'com.enonic.app.hmdb:heading'> = (params) => {
	const component = params.component as PartComponent;
	const heading = component.config?.heading || params.content.displayName;

	return {
		path: '/',
		type: 'part',
		descriptor: 'com.enonic.app.hmdb:heading',
		config: params.content || {},
		heading: heading,
	};

};

