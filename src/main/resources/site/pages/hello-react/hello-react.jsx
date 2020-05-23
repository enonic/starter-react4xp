import React from 'react';


function makeThingDropper(droppableProp, initialCountProp) {
    let currentCount = initialCountProp;
    return () => {
        currentCount--;
        console.log(currentCount.toString(), droppableProp, 'on the wall.');
        document.getElementById('counter').innerText = currentCount;
    };
}

export default (props) => {
    const dropThing = makeThingDropper(props.droppableThing, props.initialCount);
    return (
        <div onClick={dropThing}>
            <h1>
                {props.message} {props.messageTarget}!
            </h1>
            <p>
                Click me: <span id="counter">{props.initialCount}</span> {props.droppableThing} on the wall.
            </p>
        </div>
    );
}
