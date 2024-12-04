export const twoColumnsProps = ({
	component,
}) => {
	const {regions} = component;
	// const {mode} = request;
	// log.info('mode:%s', mode);
	if (!regions.left) {
		regions.left = {
			components: []
		};
	}
	if (!regions.right) {
		regions.right = {
			components: []
		};
	}
	return {
		regions
	};
}
