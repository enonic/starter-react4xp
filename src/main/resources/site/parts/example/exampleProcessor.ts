import type { PartComponentProcessorFunction } from '/lib/enonic/react4xp/DataFetcher';

// import { toStr } from '@enonic/js-utils/value/toStr';

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
	const { component } = params;
	const { config } = component;
	const { myHtmlArea } = config;
	return {
		props: {
			myHtmlArea
		}
	};
}
