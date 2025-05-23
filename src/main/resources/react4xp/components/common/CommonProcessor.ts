import type {ComponentProcessorFunction} from '@enonic-types/lib-react4xp/DataFetcher';

export const commonProcessor: ComponentProcessorFunction<'com.enonic.app.hmdb:main'> = (_props) => {

    return {
        commonData: 'common data example',
    };
};
