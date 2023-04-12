import React from 'react';
import './example.sass';
import dayjs from 'dayjs';

// Relative to this file
// import Hello from '../../../lib/myReactComponents/Hello';

// Absolute, but resolved relative to src/main/resources
import Hello from '/lib/myReactComponents/Hello';


function Example() {
	return <div>
		<Hello/>
		{dayjs().format()}
	</div>;
}

export default Example;
