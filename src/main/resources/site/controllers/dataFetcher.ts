import { DataFetcher } from '/lib/enonic/react4xp';
import { portalSiteProcessor } from '../content-types/portalSiteProcessor';

export const dataFetcher = new DataFetcher();
dataFetcher.addContentType('portal:site', { processor: portalSiteProcessor });
