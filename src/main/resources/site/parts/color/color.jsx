import React from 'react';

export default (props) => (
    <div style={{
        border: `1px solid ${props.color}`,
        margin: "8px",
        padding: "8px",
        borderRadius: "10px"
    }}>
        <p style={{color: props.color}}>Hey, I'm pretty {props.color}!</p>
    </div>
);
