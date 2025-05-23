import {ComponentRegistry} from '@enonic/react-components';
import {Hello} from './components/hello/Hello';
import {TwoColumnLayout} from './components/layouts/TwoColumn';
import {Page} from './components/page/Page';
import Example from './components/parts/example/example';

export const componentRegistry = new ComponentRegistry();

componentRegistry.addContentType('portal:site', {View: Hello});
componentRegistry.addPage('com.enonic.app.hmdb:main', {View: Page});
componentRegistry.addPart('com.enonic.app.react4xp:example', {View: Example});
componentRegistry.addLayout('com.enonic.app.hmdb:2-column', {View: TwoColumnLayout});
componentRegistry.addPage('com.enonic.app.react4xp:Page', {View: Page});
componentRegistry.addLayout('com.enonic.app.react4xp:TwoColumns', {View: TwoColumnLayout});