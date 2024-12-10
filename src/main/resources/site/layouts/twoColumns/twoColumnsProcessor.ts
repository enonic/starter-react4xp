import type { LayoutComponentProcessorFunction } from '/lib/enonic/react4xp/DataFetcher';

export const twoColumnsProcessor: LayoutComponentProcessorFunction = ({
	component,
}) => {
	const {regions} = component;
	// const {mode} = request;
	// log.info('mode:%s', mode);
	if (!regions.left) {
		regions.left = {
			components: [],
			name: 'left',
		};
	}
	if (!regions.right) {
		regions.right = {
			components: [],
			name: 'right',
		};
	}
	return {
		props: {
			regions
		}
	};
}
