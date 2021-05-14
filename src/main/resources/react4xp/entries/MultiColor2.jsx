import React, { useState, useEffect } from 'react';

import Button from '../shared/multicolor/Button';
import ColorButtons from '../shared/multicolor/ColorButtons';
import ActiveColorOval from '../shared/multicolor/ActiveColorOval';

import './MultiColor.scss';
import '../shared/multicolor.scss';

const MultiColor2 = ({colors}) => {
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        if (document) {
            document.title = colors[selected];
        }
    });

    return colors.length
        ?   <div className="multi-color">
                <Button className="my-button" clickFunc={ () => setSelected(sel => (sel - 1 + colors.length) % colors.length)}>Previous color</Button>
                <Button className="my-button" clickFunc={ () => setSelected(sel => (sel + 1) % colors.length)}>Next color</Button>

                <ActiveColorOval color={colors[selected]} />

                <ColorButtons colors={colors}
                              selectedIndex={selected}
                              clickFunc={ i => setSelected(i % colors.length)}
                />
            </div>

        :   <p>Add some color!</p>;

}

export default (props) => <MultiColor2 {...props} />;
