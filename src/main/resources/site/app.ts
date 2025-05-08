import {render} from '/lib/enonic/react4xp';
import {type Content, get as getContentByKey} from '/lib/xp/content';
import {getContent, pageUrl} from '/lib/xp/portal';
import {dataFetcher} from '/react4xp/dataFetcher';
import type {AppProps} from '/types/AppProps';
import type {Request, Response} from '@enonic-types/core';

export function get(request: Request): Response {
    let content = getContent();
    if (content.type == "base:shortcut") {
        const targetId: string = content.data.target as string
        if (targetId) {
            content = getContentByKey<Content>({key: targetId});
            if (content) {
                return {
                    status: 302,
                    redirect: pageUrl({path: content._path})
                };
            }
        }
        return {
            status: 404
        }
    }
    const component = dataFetcher.process({
        content, // Since it's already gotten, pass it along, so DataFetcher doesn't have to get it again.
        request,
    });

    const props: AppProps = {
        component
    }
    const react4xpId = `react4xp_${content._id}`;
    const htmlBody = `<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>${content.displayName}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="This page is a home movie database developed with React4XP 6.">
		</head>
		<body>
			<div id="${react4xpId}" class="contentContainer"></div>
		</body>
	</html>`;

    const output = render(
        'App',
        props,
        request,
        {
            body: htmlBody,
            id: react4xpId,
        }
    );

    return output;
}
