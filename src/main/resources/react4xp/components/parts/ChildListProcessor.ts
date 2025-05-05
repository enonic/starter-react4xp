import {getChildren} from '/lib/xp/content';
import {PartComponent} from '@enonic-types/core';
import type {ComponentProcessorFunction} from '@enonic-types/lib-react4xp/DataFetcher';

export const childListProcessor: ComponentProcessorFunction<'com.enonic.app.hmdb:child-list'> = (params) => {
	const component = params.component as PartComponent;
	const sortOrder: any = component.config.sorting;

	const result = getChildren({
		key: params.content._id,
		start: 0,
		count: 99,
		sort: sortOrder
	});

	return {
		names: result.hits.map((content) => content.displayName),
		paths: result.hits.map((content) => params.request.path + '/' + content._name),
	};
};
