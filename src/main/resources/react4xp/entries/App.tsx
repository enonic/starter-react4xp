import type { AppProps } from '/types/AppProps';

import * as React from 'react';
import {BaseComponent} from '@enonic/react-components';
import {componentRegistry} from '../componentRegistry';

const App: React.FC<AppProps> = (props) => {
	return (
		<BaseComponent componentRegistry={componentRegistry} {...props}/>
	);
}

App.displayName = 'App';

export default App;
