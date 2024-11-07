import * as React from 'react';

export interface InfoPanelProps {
	body: string
	header: string
}

export function InfoPanel({
	body,
	header,
}: InfoPanelProps) {
	return <div className="macro-panel macro-panel-info macro-panel-styled"><i className="icon"></i><strong>{header}</strong>{body}</div>;
}
