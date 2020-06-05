import React from 'react';

export default ({clickFunc, label}) =>
    <button className="my-button"
            type="button"
            onClick={clickFunc}
    >
        {label}
    </button>;
