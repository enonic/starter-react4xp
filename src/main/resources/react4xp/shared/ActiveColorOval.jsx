import React from 'react';

export default ({color}) =>
    <div className="activeColorOval"
         style={{backgroundColor: color}}
    >
        {color}
    </div>
