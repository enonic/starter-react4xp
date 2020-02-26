import React, { useState } from 'react';

function Hey(props) {
    const [count, setCount] = useState(1);
    const message = ` Hello ${props.greetee}`;
    return <p onClick={()=>setCount(count + 1)}>{message.repeat(count)}!</p>;
};
export default Hey;
