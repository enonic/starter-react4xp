import Hello from '/lib/myReactComponents/Hello';
import {Part} from '@enonic/react-components';
import dayjs from 'dayjs';
import React, {useState} from 'react';

export const Example = (props: any) => {

    const {componentRegistry, ...extraProps} = props;
    const [count, setCount] = useState(0);

    return (
        <Part {...extraProps}>
            <Hello/>
            <div>Part: {dayjs().format()}</div>
            <button onClick={() => setCount(prev => prev + 1)}>{count}</button>
        </Part>
    );
};


export default Example;
