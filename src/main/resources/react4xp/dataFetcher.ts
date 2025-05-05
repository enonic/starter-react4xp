import {DataFetcher} from '/lib/enonic/react4xp';
import {personProcessor} from './components/content/PersonProcessor';
import {layoutProcessor} from './components/layouts/TwoColumnProcessor';
import {pageProcessor} from './components/page/PageProcessor';
import {childListProcessor} from './components/parts/ChildListProcessor';
import {headingProcessor} from './components/parts/HeadingProcessor';
import {movieProcessor} from "./components/parts/MovieProcessor";

export const dataFetcher = new DataFetcher();


dataFetcher.addContentType('com.enonic.app.hmdb:person', {processor: personProcessor});
dataFetcher.addPage('com.enonic.app.hmdb:main', {processor: pageProcessor});
dataFetcher.addPart('com.enonic.app.hmdb:child-list', {processor: childListProcessor});
dataFetcher.addPart('com.enonic.app.hmdb:heading', {processor: headingProcessor});
dataFetcher.addLayout('com.enonic.app.hmdb:2-column', {processor: layoutProcessor});
dataFetcher.addPart('com.enonic.app.hmdb:movie-details', {processor: movieProcessor});
