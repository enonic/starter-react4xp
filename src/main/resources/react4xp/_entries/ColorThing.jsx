import React from 'react';

export default (props) =>
    <div style={{border: `1px dotted ${props.color}`,margin:"5px",padding:"5px" }}>
        <h2>The {props.color} thing</h2>
        <p style={{color: props.color}}>Hey, I'm pretty {props.color}!</p>
    </div>;
