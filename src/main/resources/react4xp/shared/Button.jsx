import React from 'react';

export default ({clickFunc, className, style, children}) =>
    <button className={className}
            type="button"
            onClick={clickFunc}
            style={style}
    >
        {children}
    </button>;
