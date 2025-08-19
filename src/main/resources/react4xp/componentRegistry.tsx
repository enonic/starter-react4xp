import {ComponentRegistry} from '@enonic/react-components';
import {Hello} from './components/hello/Hello';

export const componentRegistry = new ComponentRegistry();

componentRegistry.addContentType('portal:site', {View: Hello});