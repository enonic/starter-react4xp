import {ComponentRegistry} from '@enonic/react-components';
import {Person} from './components/content/Person';
import {TwoColumnLayout} from './components/layouts/TwoColumn';
import {Factbox} from './components/macro/FactBox';
import {Page} from './components/page/Page';
import {ChildList} from './components/parts/ChildList';
import {Heading} from './components/parts/Heading';
import {Movie} from './components/parts/Movie';

export const componentRegistry = new ComponentRegistry;


componentRegistry.addContentType('com.enonic.app.hmdb:person', {View: Person});
componentRegistry.addMacro('factbox', {View: Factbox});
componentRegistry.addPage('com.enonic.app.hmdb:main', {View: Page});
componentRegistry.addPart('com.enonic.app.hmdb:child-list', {View: ChildList});
componentRegistry.addPart('com.enonic.app.hmdb:heading', {View: Heading});
componentRegistry.addLayout('com.enonic.app.hmdb:2-column', {View: TwoColumnLayout});
componentRegistry.addPart('com.enonic.app.hmdb:movie-details', {View: Movie});
