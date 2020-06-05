import React from 'react';

export default ({color}) =>
    <div className="coloredSquare"
         style={{backgroundColor: color}}
    >
        {color}
    </div>
