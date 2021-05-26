import React from 'react';

import './ActiveColorOval.scss';

export default ({color}) =>
    <div className="active-color-oval"
         style={{backgroundColor: color}}
    >
        {color}
    </div>
