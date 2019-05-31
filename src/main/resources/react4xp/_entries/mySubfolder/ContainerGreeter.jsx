import React from 'react';

import InnerGreeter from '../../myChunk/InnerGreeter';

export default (props) => <div className="contained">
    <InnerGreeter {...props} />
</div>;
