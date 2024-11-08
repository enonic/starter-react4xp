// TODO 7.15.0-B1 release of @enonic-types/core
// import type {Region} from '@enonic-types/core';
// import type {ComponentRegistry} from '@enonic/react-components';

import './default.sass'; // Create Error reference failed
// import { toStr } from '@enonic/js-utils/value/toStr';
import {
	ComponentRegistry,
	XpPage
} from '@enonic/react-components';
// import dayjs from 'dayjs';
import * as React from 'react';


export interface DefaultPageProps {
	componentRegistry: ComponentRegistry;
	// regions: Record<string, Region>;
	regions: Record<string, unknown>;
}


export function DefaultPage(props: DefaultPageProps) {
	// console.info('DefaultPage props:', toStr(props));
	return (
		// @ts-expect-error regions not compatible
		<XpPage
			as='main'
			className="default-page"
			{...props}
		>
			{/* Warning: Text content did not match. Server: "2024-11-08T09:36:59+01:00" Client: "2024-11-08T09:37:00+01:00" */}
			{/* Uncaught Error: Text content does not match server-rendered HTML. */}
			{/* <div>Page: {dayjs().format()}</div> */}
		</XpPage>
	);
}
