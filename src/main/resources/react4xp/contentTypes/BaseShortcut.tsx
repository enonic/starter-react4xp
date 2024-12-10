import * as React from 'react';

import type { BaseShortcutProps } from '/types/BaseShortcutProps';

export const BaseShortcut = (props: BaseShortcutProps) => {
	console.debug('BaseShortcut props:', props);
	const {
		error,
		warning,
	} = props;
	return (
		<div>
			<h1>{error ? 'Error' : 'Warning'}</h1>
			<p>{error || warning}</p>
		</div>
	);
};
