import { DataFetcher } from '/lib/enonic/react4xp';
import { portalSiteProps } from '../content-types/portalSiteProps';
import { defaultPageProps } from '../pages/default/defaultProps';
import { twoColumnsProps } from '../layouts/twoColumns/twoColumnsProps';
import { exampleProps } from '../parts/example/exampleProps';

export const dataFetcher = new DataFetcher();
// dataFetcher.addUrlPath(/\/fisk\//, { toProps});

dataFetcher.addContentType('portal:site', { toProps: portalSiteProps });
dataFetcher.addPage('com.enonic.app.react4xp:default', { toProps: defaultPageProps });
dataFetcher.addLayout('com.enonic.app.react4xp:twoColumns', { toProps: twoColumnsProps });
// dataFetcher.addPart('com.enonic.app.react4xp:example', { toProps: exampleProps });
