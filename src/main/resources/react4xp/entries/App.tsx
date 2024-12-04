import type { AppProps } from '/types/AppProps';

import * as React from 'react';
import {XpComponent} from '@enonic/react-components';
import {componentRegistry} from '../componentRegistry';

const App: React.FC<AppProps> = (props) => {
	return (
		<XpComponent componentRegistry={componentRegistry} {...props}/>
	);
}

App.displayName = 'App';

export default App;
