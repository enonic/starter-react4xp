import type { PageComponentProps } from './default.d';
import React from 'react';
import { Regions } from '@enonic/react-components';
import dayjs from 'dayjs';


function Page (props: PageComponentProps) {
	return (
		<div className="default-page">
			<Regions {...props} />
			<div>Page: {dayjs().format()}</div>
		</div>
	);
}

export default (props: PageComponentProps) => <Page {...props}/>;
