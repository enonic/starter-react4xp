import { DataFetcher } from '/lib/enonic/react4xp';
import { portalSiteProcessor } from '../content-types/portalSiteProcessor';
import { baseShortcutProcessorWrapper } from '../content-types/baseShortcutProcessor';
import { defaultPageProcessor } from '../pages/default/defaultPageProcessor';
import { twoColumnsProcessor } from '../layouts/twoColumns/twoColumnsProcessor';
import { exampleProcessor } from '../parts/example/exampleProcessor';

export const dataFetcher = new DataFetcher();
// dataFetcher.addUrlPath(/\/fisk\//, { processor});

// dataFetcher.addContentType('base:folder', { processor: portalSiteProps });
dataFetcher.addContentType('base:shortcut', { processor: baseShortcutProcessorWrapper(dataFetcher) });
// TODO dataFetcher.addContentType('portal:template-folder')
dataFetcher.addContentType('portal:site', { processor: portalSiteProcessor });
dataFetcher.addPage('com.enonic.app.react4xp:default', { processor: defaultPageProcessor });
dataFetcher.addLayout('com.enonic.app.react4xp:twoColumns', { processor: twoColumnsProcessor });
dataFetcher.addPart('com.enonic.app.react4xp:example', { processor: exampleProcessor });
