import React from 'react';

let bottleCount = 99;
function dropBottle() {
    bottleCount--;
    console.log(bottleCount, 'bottles of beer on the wall.');
    document.getElementById('counter').innerText = bottleCount;
};

export default (props) => <div onClick={dropBottle}>
    <h1>Hello world!</h1>
    <p>Click me: <span id="counter">{bottleCount}</span> bottles of beer on the wall.</p>
</div>;
