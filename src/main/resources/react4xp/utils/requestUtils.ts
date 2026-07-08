import type {Request, Response, Component} from '@enonic-types/core';
import {getUser} from '/lib/xp/auth';
import {Content, get as getContentByKey, exists} from '/lib/xp/content';
import {pageUrl, getContent, getSite} from '/lib/xp/portal';
import {get as getContext, run as runContext} from '/lib/xp/context';
import {getIn} from '@enonic/js-utils/object/getIn';

export function handlePermissions(request: Request): Response {
    const path = getContentPath(request);
    if (path && isContentExists(path)) {

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

export function jsonError(text: string, status?: number): Response {
    return newResponse({
        status: status === undefined ? 400 : status,
        contentType: 'application/json',
        body: JSON.stringify({
            error: text
        })
    });
}

export function getContentPath(request: Request): string {
    const site = getSite();
    if (!site) {
        return request.path;
    }

    const siteBase = pageUrl({path: site._path}).replace(/\/+$/, '');
    const tail = request.path.indexOf(siteBase) === 0
        ? request.path.substring(siteBase.length)
        : request.path;

    return (site._path + tail).replace(/\/+$/, '') || '/';
}

function isContentExists(path: string): boolean {
    if (!path) {
        return false;
    }
    const context = getContext();
    return runContext({
        repository: context.repository,
        branch: context.branch,
        principals: ["role:system.admin"]
    }, () => {
        return exists({
            key: path
        })
    });
}

export function getComponent(params: {
    content?: Content;
    request: Request;
}) {
    const content = params.content || getContent();
    if (!content) {
        throw new Error('getComponent: no content available');
    }
    const request = params.request;
    const componentPath = request.path;
    const page = content.page;
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
