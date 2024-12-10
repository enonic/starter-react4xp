import type { PortalSiteProps } from '/types/PortalSiteProps';

import * as React from 'react';

export const PortalSite = ({ title, text }: PortalSiteProps) => {
	return (
		<div>
			<h1>{title}</h1>
			<p>{text}</p>
		</div>
	);
};
