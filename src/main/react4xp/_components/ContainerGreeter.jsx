import React from 'react';

import InnerGreeter from '../sharedComps/InnerGreeter';

export default (props) => <div className="contained">
    <InnerGreeter {...props} />
</div>;
