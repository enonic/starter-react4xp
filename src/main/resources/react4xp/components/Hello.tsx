// File: src/main/resources/react4xp/components/Hello.tsx
import type {HelloProps} from '/types/HelloProps';
import * as React from 'react';

export const Hello = ({title, text, initialCount}: HelloProps) => {
	const [count, setCount] = React.useState(initialCount);

	return (
		<div>
			<h1>{title}</h1>
			<h2>{text}</h2>
			<div>
				{count > 0 ?
				 <>
					 <p><span className={"helloBottles"}>{count}</span>{' '}bottles of beer on the wall</p>
					 <button className={"helloButton"} onClick={() => setCount(count - 1)}>Drink beer</button>
				 </> :
				 <h3>Error 204: No beer</h3>}

			</div>
		</div>
	);
};
