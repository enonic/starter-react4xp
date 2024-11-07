// TODO 7.15.0-B1 release of @enonic-types/core
// import type {Region} from '@enonic-types/core';
import type {ComponentRegistry} from '@enonic/react-components';

import { toStr } from '@enonic/js-utils/value/toStr';
import {XpRegions} from '@enonic/react-components';
import * as React from 'react';
// import dayjs from 'dayjs';

export interface TwoColumnsLayoutProps {
	componentRegistry?: ComponentRegistry;
	// regions: Record<string, Region>;
	regions: Record<string, unknown>;
}

export function TwoColumnsLayout (props: TwoColumnsLayoutProps) {
	console.debug('TwoColumnsLayout props:', toStr(props));
	const regionsProps = {
		componentRegistry: props.componentRegistry,
		regions: props.regions
	};
	console.debug('TwoColumnsLayout regionsProps:', toStr(regionsProps));
	return <div data-portal-component-type="layout">
		<div style={{
			columnGap: '1em',
			display: 'grid',
			gridTemplateColumns: '1fr 1fr'
		}}>
			{/* @ts-ignore */}

				<XpRegions {...regionsProps}/>
			{/* <div>Layout: {dayjs().format()}</div> */}
		</div>
	</div>;
}
