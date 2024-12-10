import type { Site } from '@enonic-types/lib-content';
import type { ContentTypeProcessorFunction } from '/lib/enonic/react4xp/DataFetcher';
// import type { PortalSiteProps } from '/types/PortalSiteProps';

// import { toStr } from '@enonic/js-utils/value/toStr';

export const portalSiteProcessor: ContentTypeProcessorFunction<
	Site<Record<string, unknown>>
> = (params) => {
	// log.info('portalSiteProcessor params:%s', toStr(params));
	return {
		props: /*<PortalSiteProps>*/{
			title: 'React4XP Starter',
			text: 'Welcome to the React4XP starter!',
		}
	};
};
