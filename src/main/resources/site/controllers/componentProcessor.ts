import { toStr } from '@enonic/js-utils/value/toStr';
import {get as getContentByKey} from '/lib/xp/content';
import {
	getComponent as getComponentSchema,
	listSchemas
} from '/lib/xp/schema';
import {
	getContent as getCurrentContent,
	getSiteConfig as getCurrentSiteConfig,
	processHtml
} from '/lib/xp/portal';
import {ComponentProcessor} from '@enonic/react-components/ComponentProcessor';

export const componentProcessor = new ComponentProcessor({
	getComponentSchema,
	getContentByKey,
	getCurrentContent,
	getCurrentSiteConfig,
	listSchemas,
	processHtml
});

componentProcessor.addPart('com.enonic.app.react4xp:example', {
	toProps: ({
		component,
		content,
		processedConfig,
		request,
		siteConfig,
	}) => {
		// log.info('part toProps:%s', toStr({
		// 	// component,
		// 	// content,
		// 	// processedConfig,
		// 	// request,
		// 	siteConfig
		// }));
		return {
			data: processedConfig.anHtmlArea
		};
	}
});

componentProcessor.addLayout("com.enonic.app.react4xp:twoColumns", {
	toProps: ({
		component,
		content,
		processedComponent,
		processedConfig,
		request,
		siteConfig,
	}) => {
		// log.info('layout toProps:%s', toStr({
		// 	// component,
		// 	// content,
		// 	// processedConfig,
		// 	// request,
		// 	siteConfig,
		// }));
		const {regions} = processedComponent;
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
			// data: processedConfig.anHtmlArea,
			regions
		};
	},
});

componentProcessor.addPage("com.enonic.app.react4xp:default", {
	toProps: ({
		component,
		content,
		processedComponent,
		processedConfig,
		request,
		siteConfig,
	}) => {
		// log.info('page toProps:%s', toStr({
		// 	// component,
		// 	// content,
		// 	// processedConfig,
		// 	// request,
		// 	siteConfig,
		// }));
		const {regions} = processedComponent;
		// const {mode} = request;
		if (!regions.main) {
			regions.main = {
				components: []
			};
		}
		return {
			regions
		};
	},
});
