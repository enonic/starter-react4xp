import React from 'react';

import './Button.scss';

export default ({clickFunc, className, style, children}) =>
    <button className={className}
            type="button"
            onClick={clickFunc}
            style={style}
    >
        {children}
    </button>;
