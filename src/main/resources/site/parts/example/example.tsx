import React from 'react';
import './example.sass';
import dayjs from 'dayjs';


function Example() {
	return <div>{dayjs().format()}</div>;
}

export default Example;
