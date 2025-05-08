import {PageDescriptor} from '@enonic-types/core';
import type {ComponentProcessorFunction} from '@enonic-types/lib-react4xp/DataFetcher';

export const helloProcessor: ComponentProcessorFunction<PageDescriptor> = (params) => {
    return {
        title: `${params.content.displayName}`,
        initialCount: 0,
    };
};