import {getSite, pageUrl} from '/lib/xp/portal';
import {parentPath} from '/react4xp/utils/path';
import {PageComponent} from "@enonic-types/core";
import type {ComponentProcessorFunction} from '@enonic-types/lib-react4xp/DataFetcher';

export const pageProcessor: ComponentProcessorFunction<'com.enonic.app.hmdb:main'> = (props) => {
	const component = props.component as PageComponent;
	const regions = component?.regions || {};
	const site = getSite();

	const baseUrl = pageUrl({path: site._path});
	const parentSegment = parentPath(props.request.path);
	const parentBaseSegment = parentPath(baseUrl);

	// always define parent, but only keep it if it truly differs
	const parent = parentSegment !== parentBaseSegment
				   ? parentSegment
				   : undefined;

	return {
		page: {
			type: 'page',
			path: '/',
			config: component.config || {},
			descriptor: 'com.enonic.app.hmdb:main',
			regions
		},
		parent

	};
};
