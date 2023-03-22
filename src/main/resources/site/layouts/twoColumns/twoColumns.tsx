import React from 'react';
import {Regions} from '@enonic/react-components';


export default (props: Parameters<typeof Regions>[0]) => {
	return <div style={{
		columnGap: '1em',
		display: 'grid',
		gridTemplateColumns: '1fr 1fr'
	}}>
		<Regions {...props}/>
	</div>;
};
