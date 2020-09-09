import React from 'react';

import './Info.scss';

const Info = ({heading, children}) => (
    <div className="info">
        {heading ? <h3>{heading}</h3> : null}
        {children}
    </div>
);

export default Info;
