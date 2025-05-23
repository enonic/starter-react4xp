import type {AppProps} from '/types/AppProps';
import {BaseComponent} from '@enonic/react-components';
import * as React from 'react';
import {componentRegistry} from '../componentRegistry';

const App: React.FC<AppProps> = (props) => {
    return (
        <>
            <BaseComponent componentRegistry={componentRegistry} data={props}/>
        </>
    );
}

App.displayName = 'App';

export default App;
