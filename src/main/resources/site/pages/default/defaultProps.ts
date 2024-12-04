export const defaultPageProps = ({
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
			components: []
		};
	}
	return {
		regions
	};
}
