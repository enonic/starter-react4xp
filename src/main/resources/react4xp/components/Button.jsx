import React from 'react';

export default ({func, label}) =>
    <button class="my-button"
            type="button"
            onClick={func} >
        {label}
    </button>;
