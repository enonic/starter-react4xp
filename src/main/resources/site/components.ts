import {render} from '/lib/enonic/react4xp';
import {getContent} from '/lib/xp/portal';
import type {AppProps} from '/types/AppProps';
import type {Component, Content, Request, Response} from '@enonic-types/core';

import {getIn} from '@enonic/js-utils/object/getIn';
import {dataFetcher} from '../react4xp/dataFetcher';


const JsonResponse = (obj: Record<string, unknown>, status = 200): Response => ({
    body: JSON.stringify(obj),
    contentType: 'application/json',
    status
});

const JsonErrorResponse = (error: string, status = 400): Response => JsonResponse({error}, status);

const regionPathFromRequestPath = (path: string): string => path.replace(/^.*\/_\/component\/(.+)$/, '$1')
    .replace(/\//, '.components.')
    .replace(/\//, '.regions.')
    .replace(/\//, '.components.');

const getComponent = ({
                          content = getContent(),
                          request,
                      }: {
    content: Content;
    request: Request;
}) => {
    const {
        path: componentPath,
    } = request;
    const {page} = content;
    const regions = page['regions'] || {};
    const regionPath = regionPathFromRequestPath(componentPath);
    return getIn(regions, regionPath) as Component;
}

export function get(request: Request) {
    const {
        branch,
        mode,
    } = request;
    if (branch !== 'draft') {
        return JsonErrorResponse('ComponentUrl only available at the draft branch.');
    }
    if (mode === 'live') {
        return JsonErrorResponse('ComponentUrl not available in live mode.');
    }
    const content = getContent();
    const origComponent = getComponent({
        content,
        request,
    });
    const component = dataFetcher.process({
        component: origComponent,
        content,
        request
    });

    const props: AppProps = {
        component
    }

    const react4xpId = `react4xp_${content._id}`;
    const output = render(
        'App',
        props,
        request,
        {
            body: `<div id="${react4xpId}"></div>`,

            // If none of your react components are interactive,
            // you may disable hydration:
            // hydrate: false,

            // If you only want client-side rendering,
            // you can disable server-side rendering here:
            // ssr: false,

            id: react4xpId

            // Generate server relative urls or fully qualified urls.
            // Will use what is set here:
            // urlType: 'absolute'
            // urlType: 'server'
            // Or in application config:
            // # react4xp.urlType = absolute
            // # react4xp.urlType = server
            // Or fallback to the default, which is 'server'
        }
    );
    return output;
}