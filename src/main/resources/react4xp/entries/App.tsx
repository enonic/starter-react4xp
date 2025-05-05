import type {AppProps} from '/types/AppProps';
import {BaseComponent} from '@enonic/react-components';
import * as React from 'react';
import {componentRegistry} from '../componentRegistry';
import Footer from "../components/common/Footer"
import '../components/globalStyles.css'

const App: React.FC<AppProps> = (props) => {
	return (
		<>
			<BaseComponent componentRegistry={componentRegistry} {...props}/>
			{(props.component.type == "page" || props.component.type == "contentType")
			 && <Footer logoUrl={props.url}/>}
		</>
	);
}

App.displayName = 'App';

export default App;
