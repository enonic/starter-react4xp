import * as React from 'react';
import { ComponentRegistry } from '@enonic/react-components';
import { PortalSite } from './components/PortalSite';

export const componentRegistry = new ComponentRegistry;
componentRegistry.addContentType('portal:site', { View: PortalSite });
