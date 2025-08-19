import type {Request, Response, Component} from '@enonic-types/core';
import {getUser} from '/lib/xp/auth';
import {Content, get as getContentByKey, exists} from '/lib/xp/content';
import {pageUrl, getContent} from '/lib/xp/portal';
import {get as getContext, run as runContext} from '/lib/xp/context';
import {getIn} from '@enonic/js-utils/object/getIn';

export function handlePermissions(request: Request): Response {
    if (isContentExists(getContentPath(request))) {

        if (!getUser()) {
            return newResponse({
                status: 401,
            });
        }

        return newResponse({
            status: 403,
        });
    }

    return notFound();
}

export function handleShortcut(content: Content) {
    const targetId: string = content.data.target as string
    if (targetId) {
        content = getContentByKey<Content>({key: targetId});
        if (content) {
            return newResponse({
                status: 302,
                redirect: pageUrl({path: content._path})
            });
        }
    }

    return notFound();
}

export function newResponse(init?: Response): Response {
    return {
        status: 200,
        ...init,
    };
}

export function notFound(text?: string): Response {
    return newResponse({
        status: 404,
        contentType: 'text/html',
        body: text || '<h1>Page not found</h1>'
    });
}

export function jsonError(text: string, status: number = 400): Response {
    return newResponse({
        status,
        contentType: 'application/json',
        body: JSON.stringify({
            error: text
        })
    });

}

export function getContentPath(request): string {
    const basePath = request.contextPath.substring(0, request.contextPath.lastIndexOf('/'));
    return request.path.substring(basePath.length);
}

function isContentExists(path: string): boolean {
    const {repository, branch} = getContext();
    return runContext({
        repository,
        branch,
        principals: ["role:system.admin"]
    }, () => {
        return exists({
            key: path
        })
    });
}

export function getComponent({
                                 content = getContent(),
                                 request,
                             }: {
                                 content: Content;
                                 request: Request;
                             }
) {
    const {
        path: componentPath,
    } = request;
    const {page} = content;
    const regions = page['regions'] || {};
    const regionPath = regionPathFromRequestPath(componentPath);
    return getIn(regions, regionPath) as Component;
}

function regionPathFromRequestPath(path: string): string {
    return path.replace(/^.*\/_\/component\/(.+)$/, '$1')
        .replace(/\//, '.components.')
        .replace(/\//, '.regions.')
        .replace(/\//, '.components.')
}
