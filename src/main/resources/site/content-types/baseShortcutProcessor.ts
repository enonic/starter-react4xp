import type { Content } from '@enonic-types/core';
import type { ContentTypeProcessorFunction } from '/lib/enonic/react4xp/DataFetcher';
import type { BaseShortcutProps } from '/types/BaseShortcutProps';

// import { toStr } from '@enonic/js-utils/value/toStr';
import {
	exists,
	get as getContentByKey
} from '/lib/xp/content';
import { pageUrl } from '/lib/xp/portal';

type BaseShortcutContent = Content<{
	parameters: {
		name: string;
		value: string;
	}[];
	target: string;
}, 'base:shortcut'>;

// declare global {
// 	interface XpContent {
// 		'base:shortcut': BaseShortcutContent;
// 	}
// }

export const baseShortcutProcessorWrapper = (dataFetcher): ContentTypeProcessorFunction<BaseShortcutContent> => (params) => {
	// log.info('baseShortcutProcessor params:%s', toStr(params));
	const {
		content,
		component, // CAUTION: Important so it doesn't end up in passAlong.
		request,
		...passAlong
	} = params;
	const { type: contentType } = content;

	if ( contentType === 'base:shortcut' ) {
		const { data } = content;
		const {
			parameters = [],
			target: targetContentId,
		} = data;
		const { mode } = request;
		// When ok
		//  In live and preview redirect
		//  In edit and inline render the target content?
		// When not ok
		//  In live show 404
		//  In edit show warning
		//  In inline and preview show error
		if (targetContentId && exists({ key: targetContentId })) {
			if (mode === 'live' || mode === 'preview') {
				return {
					response: {
						redirect: `${pageUrl({ id: targetContentId })}${
							parameters.length
								? `?${
									parameters.map(({
										name,
										value
									}) => `${name}=${value}`).join('&')
								}`
								: ''
						}`
					}
				};
			} else {
				const targetContent = getContentByKey({ key: targetContentId });
				const {
					component,
					response,
				} = dataFetcher.process({
					...passAlong,
					content: targetContent,
					// component, // Gotten from content inside DataFetcher :)
					request,
				});
				if (response) {
					return {
						response
					};
				}
				// TODO Does this work?
				return {
					props: component['props']
				};
			}
		}

		if (mode === 'live') {
			return {
				response:  {
					status: 404
				}
			};
		}

		if (!targetContentId) {
			if (mode === 'edit') {
				return {
					props: <BaseShortcutProps>{
						warning: `Please select a target content for this shortcut.`
					}
				};
			}
			// mode === 'inline' || mode === 'preview'
			return {
				props: <BaseShortcutProps>{
					error: `Target content NOT selected for this shortcut!`
				}
			};
		} else if (!exists({ key: targetContentId })) {
			return {
				props: <BaseShortcutProps>{
					error: `Shortcut target content NOT found: ${targetContentId}!`
				}
			};
		}
	} // base:shortcut

	const {
		data,
	} = content;
	return {
		props: data
	};
};
