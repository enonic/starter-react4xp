import cx from 'clsx';
import * as React from 'react';
import './panel.css';

interface CommonPanelProps {
	body: string
	header: string
}

interface PanelProps extends CommonPanelProps {
	panelStyle:
		| 'default'
		| 'error'
		| 'info'
		| 'note'
		| 'success'
}

function Panel({
	body,
	header,
	panelStyle,
}: PanelProps) {
	return (
		<div className={cx(
			'macro-panel',
			`macro-panel-${panelStyle}`,
			'macro-panel-styled'
		)}><i className="icon"></i><strong>{header}</strong>{body}</div>
	);
}

export const DefaultPanel = (commonPanelProps: CommonPanelProps) => <Panel {...commonPanelProps}  panelStyle='default'/>;
export const ErrorPanel = (commonPanelProps: CommonPanelProps) => <Panel {...commonPanelProps}  panelStyle='error'/>;
export const InfoPanel = (commonPanelProps: CommonPanelProps) => <Panel {...commonPanelProps}  panelStyle='info'/>;
export const NotePanel = (commonPanelProps: CommonPanelProps) => <Panel {...commonPanelProps}  panelStyle='note'/>;
export const SuccessPanel = (commonPanelProps: CommonPanelProps) => <Panel {...commonPanelProps}  panelStyle='success'/>;
