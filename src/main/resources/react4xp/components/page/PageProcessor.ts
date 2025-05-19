import {PageComponent} from "@enonic-types/core";
import type {ComponentProcessorFunction} from '@enonic-types/lib-react4xp/DataFetcher';

export const pageProcessor: ComponentProcessorFunction<'com.enonic.app.react4xp:Page'> = (props) => {
    const component = props.component as PageComponent;

    const regions = component?.regions || {};
    return {
        regions,
        name: "main"
    };
};
