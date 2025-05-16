import {LayoutComponent} from '@enonic-types/core';
import type {ComponentProcessorFunction} from '@enonic-types/lib-react4xp/DataFetcher';


export const layoutProcessor: ComponentProcessorFunction<'com.enonic.app.hmdb:2-column'> = ({component}) => {
    const {regions} = component as LayoutComponent;

    return {
        regions: regions,
        tags: 'section',
    };
};