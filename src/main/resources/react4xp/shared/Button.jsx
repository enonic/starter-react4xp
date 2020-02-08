import React from 'react';

export default ({func, label}) =>
    <button className="my-button"
            type="button"
            onClick={func}>
        {label}
    </button>;
