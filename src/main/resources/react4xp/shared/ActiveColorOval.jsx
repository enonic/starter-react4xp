import React from 'react';

import styles from './ActiveColorOval.scss';

export default ({color}) =>
    <div className="activeColorOval"
         style={{backgroundColor: color}}
    >
        {color}
    </div>
