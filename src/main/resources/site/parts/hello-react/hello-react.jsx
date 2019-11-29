import React from 'react';
import Dep1 from '../../../react4xp/chunks/chunk1/dep1';
import Dep2 from '../../../react4xp/chunks/chunk2/dep2';

export default (props) => <div>
    <Dep1/>
    <Dep2/>
    <p>Hello {props.greetee}!</p>
</div>;
