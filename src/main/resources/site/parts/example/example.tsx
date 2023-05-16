import React, {useState} from 'react';
import './example.sass';
import dayjs from 'dayjs';

// Relative to this file
// import Hello from '../../../lib/myReactComponents/Hello';

// Absolute, but resolved relative to src/main/resources
import Hello from '/lib/myReactComponents/Hello';


function Example() {
	const [count, setCount] = useState(0);
	return <div>
		<Hello/>
		<div>Part: {dayjs().format()}</div>
		<button onClick={() => setCount(prev => prev + 1)}>{count}</button>
	</div>;
}

export default () => <Example />;
