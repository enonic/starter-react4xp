import React from 'react';

let bottleCount = 99;
const dropBottle = () => {
    console.log(`${bottleCount--} bottles of beer on the wall`);
}

export default (props) => <p onClick={dropBottle}>Hello world</p>;
