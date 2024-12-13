import type { PartComponentProcessorFunction } from '/lib/enonic/react4xp/DataFetcher';

// import { toStr } from '@enonic/js-utils/value/toStr';
// import {assetUrl} from '/lib/enonic/react4xp';

export interface ExamplePartConfig {
	myHtmlArea: string
}

declare global {
	interface XpPartMap {
		'com.enonic.app.react4xp:example': ExamplePartConfig
	}
}

export const exampleProcessor: PartComponentProcessorFunction<'com.enonic.app.react4xp:example'> = (params) => {
	// log.info('exampleProps params:%s', toStr(params));
	const {
		component,
		request
	} = params;
	const { config } = component;
	const { myHtmlArea } = config;
	const { mode } = request;

	// const panelCss = assetUrl({
	// 	application: 'com.enonic.app.panelmacros',
	// 	path: 'css/panel.css',
	// });
	// log.info('exampleProcessor panelCss:%s', panelCss);

	return {
		// pageContributions: {
		// 	headEnd: [
		// 		`<link rel="stylesheet" href="${panelCss}" type="text/css" />`
		// 	]
		// },
		props: {
			mode,
			myHtmlArea
		},
	};
}
