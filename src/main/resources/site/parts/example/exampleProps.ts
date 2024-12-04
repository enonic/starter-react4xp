// import { toStr } from '@enonic/js-utils/value/toStr';

export interface ExamplePartConfig {
	myHtmlArea: string
}

export const exampleProps = (params) => {
	// log.info('exampleProps params:%s', toStr(params));
	const { component } = params;
	const { config } = component;
	const { myHtmlArea } = config as ExamplePartConfig;
	return {
		myHtmlArea
	};
}
