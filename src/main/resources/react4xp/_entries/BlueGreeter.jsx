import React from 'react';

export default (props) =>
    <div style={{border: "1px dotted blue", margin: "5px", padding: "5px", color: "blue"}}>
        <h2>03 - BlueGreeter</h2>
        <p>Hello, {props.greetee}!</p>
    </div>;
