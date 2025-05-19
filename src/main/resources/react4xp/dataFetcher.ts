import {DataFetcher} from '/lib/enonic/react4xp';
import {helloProcessor} from './components/hello/HelloProcessor';
import {layoutProcessor} from './components/layouts/TwoColumnProcessor';
import {pageProcessor} from './components/page/PageProcessor';
import {partProcessor} from './components/parts/example/exampleProcessor';

export const dataFetcher = new DataFetcher();

dataFetcher.addContentType('portal:site', {processor: helloProcessor});
dataFetcher.addPage('com.enonic.app.hmdb:main', {processor: pageProcessor});
dataFetcher.addPart('com.enonic.app.react4xp:example', {processor: partProcessor});
dataFetcher.addLayout('com.enonic.app.hmdb:2-column', {processor: layoutProcessor});
dataFetcher.addPage('com.enonic.app.react4xp:Page', {processor: pageProcessor});
dataFetcher.addLayout('com.enonic.app.react4xp:TwoColumns', {processor: layoutProcessor});