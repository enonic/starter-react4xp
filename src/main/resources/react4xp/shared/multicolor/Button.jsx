import React from 'react';

import './Button.scss';

export default ({clickFunc, className, style, children, errorProne}) =>
    <button className={className}
            type="button"
            onClick={clickFunc}
            style={errorProne.subThing}
    >
        {children}
    </button>;
