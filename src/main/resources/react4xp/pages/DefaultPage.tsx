// TODO 7.15.0-B1 release of @enonic-types/core
// import type {Region} from '@enonic-types/core';
// import type {ComponentRegistry} from '@enonic/react-components';

// import './default.sass'; // Create Error reference failed
// import { toStr } from '@enonic/js-utils/value/toStr';
import {
	ComponentRegistry,
	XpRegions
} from '@enonic/react-components';
import dayjs from 'dayjs';


export interface DefaultPageProps {
	componentRegistry?: ComponentRegistry;
	// regions: Record<string, Region>;
	regions: Record<string, unknown>;
}


export function DefaultPage(props: DefaultPageProps) {
	// console.info('DefaultPage props:', toStr(props));
	return (
		<div className="default-page">
			{/* @ts-ignore */}
			<XpRegions {...props} />
			<div>Page: {dayjs().format()}</div>
		</div>
	);
}
