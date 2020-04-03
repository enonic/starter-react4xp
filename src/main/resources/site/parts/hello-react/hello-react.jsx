import React, { useState } from 'react';

require('react-dom');
console.log("hello-react - window.React1:", window.React1);
window.React2 = require('react');
console.log("hello-react - window.React2:", window.React2);
console.log("hello-react - window.React3:", window.React3);
console.log("hello-react - equal:        ", window.React1 === window.React2);
console.log("hello-react - equal 2/3     ", window.React3 === window.React2);

export default (props) => {
    const [count, setCount] = useState(1);
    const message = ` Hello ${props.greetee}`;
    return <p onClick={()=>setCount(count + 1)}>{message.repeat(count)}!</p>;
};
