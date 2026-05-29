import {render} from '/lib/enonic/react4xp';
import {getContent} from '/lib/xp/portal';
import type {Request} from '@enonic-types/core';
import {dataFetcher} from '/react4xp/dataFetcher';
import {handlePermissions, jsonError, getComponent} from '/react4xp/utils/requestUtils';


export function get(request: Request) {
    const {
        branch,
        mode,
    } = request;

    // Check request mode and branch
    if (branch !== 'draft') {
        return jsonError('ComponentUrl only available at the draft branch.')
    }
    if (mode === 'live') {
        return jsonError('ComponentUrl not available in live mode.');
    }

    // Check content access
    const content = getContent();
    if (!content) {
        return handlePermissions(request);
    }

    // Fetch component data
    const component = getComponent({
        content,
        request,
    });

    // Fetch and process content data
    const data = dataFetcher.process({
        component,
        content,
        request
    });

    // Render page
    const id = `react4xp_${content._id}`;
    return render(
        'App',
        data,
        request,
        {
            body: `<div id="${id}"></div>`,
            id
        }
    );
}
