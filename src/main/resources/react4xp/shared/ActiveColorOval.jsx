import React from 'react';

import './ActiveColorOval.scss';

export default ({color}) =>
    <div className="activeColorOval"
         style={{backgroundColor: color}}
    >
        {color}
    </div>
