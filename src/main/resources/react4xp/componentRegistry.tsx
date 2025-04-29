import {ComponentRegistry} from '@enonic/react-components';
import {Hello} from './components/Hello';

export const componentRegistry = new ComponentRegistry;

componentRegistry.addContentType('portal:site', {View: Hello});
