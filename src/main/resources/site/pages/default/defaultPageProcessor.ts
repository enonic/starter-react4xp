import type { PageComponentProcessorFunction } from '/lib/enonic/react4xp/DataFetcher';

export const defaultPageProcessor: PageComponentProcessorFunction = ({
	component,
}) => {
	// log.info('page toProps:%s', toStr({
	// 	// component,
	// 	// content,
	// 	// processedConfig,
	// 	// request,
	// 	siteConfig,
	// }));
	const {regions} = component;
	// const {mode} = request;
	if (!regions.main) {
		regions.main = {
			components: [],
			name: 'main',
		};
	}
	return {
		props: {
			regions
		}
	};
}
