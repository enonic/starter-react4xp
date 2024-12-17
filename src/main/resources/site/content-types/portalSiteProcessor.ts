import type { Site } from '@enonic-types/lib-content';
import type { ContentTypeProcessorFunction } from '@enonic-types/lib-react4xp/DataFetcher';
// import type { PortalSiteProps } from '/types/PortalSiteProps';

// import { toStr } from '@enonic/js-utils/value/toStr';

export const portalSiteProcessor: ContentTypeProcessorFunction<
	Site<Record<string, unknown>>
> = (params) => {
	// log.info('portalSiteProcessor params:%s', toStr(params));
	const {
		content: {
			displayName: siteDisplayName
		}
	} = params;
	return {
		props: /*<PortalSiteProps>*/{
			title: `React4XP Starter: ${siteDisplayName}`,
			text: 'Welcome to the React4XP starter!',
		}
	};
};
