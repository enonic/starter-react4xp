import {render} from '/lib/enonic/react4xp';
import {getContent} from '/lib/xp/portal';
import {dataFetcher} from '/react4xp/dataFetcher';
import {handlePermissions, handleShortcut} from '/react4xp/utils/requestUtils';
import type {Request, Response} from '@enonic-types/core';

export function get(request: Request): Response {

    // Check content access and handle shortcuts
    const content = getContent();
    if (!content) {
        return handlePermissions(request);
    } else if (content.type == "base:shortcut") {
        return handleShortcut(content);
    }

    // Fetch and process content data
    const data = dataFetcher.process({
        content,
        request,
    });

    if (data.component.type === "page" && !data.component.descriptor) {
        return {
            status: 418
        };
    }

    // Create HTML template
    const id = `react4xp_${content._id}`;
    const body = createHtmlTemplate(id, content.displayName);

    // Render page
    return render(
        'App',
        data,
        request,
        {
            body,
            id,
        }
    );
}

function createHtmlTemplate(react4xpId: string, displayName: string) {
    return `<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>${displayName}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="This page is a home movie database developed with React4XP 6.">
		</head>
		<body>
			<div id="${react4xpId}" class="contentContainer"></div>
		</body>
	</html>`;
}
