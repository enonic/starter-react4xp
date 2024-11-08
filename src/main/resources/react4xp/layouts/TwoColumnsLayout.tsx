// TODO 7.15.0-B1 release of @enonic-types/core
// import type {Region} from '@enonic-types/core';
import type {ComponentRegistry} from '@enonic/react-components';

// import { toStr } from '@enonic/js-utils/value/toStr';
import {XpLayout} from '@enonic/react-components';
import * as React from 'react';

export interface TwoColumnsLayoutProps {
	componentRegistry: ComponentRegistry;
	// regions: Record<string, Region>;
	regions: Record<string, unknown>;
}

export function TwoColumnsLayout (props: TwoColumnsLayoutProps) {
	// console.debug('TwoColumnsLayout props:', toStr(props));
	return (
		// @ts-expect-error regions not compatible
		<XpLayout
			as="layout"
			{...props}
			style={{
				columnGap: '1em',
				display: 'grid',
				gridTemplateColumns: '1fr 1fr'
			}}>
		</XpLayout>
	);
}
