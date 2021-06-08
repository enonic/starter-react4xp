import React, { useState, useEffect } from 'react';

import Button from '../multicolor/Button';
import ColorButtons from '../multicolor/ColorButtons';
import ActiveColorOval from '../multicolor/ActiveColorOval';

import './MultiColor.scss';
import '../shared/multicolor.scss';

const MultiColor2 = ({colors}) => {
    if (typeof document === 'undefined') {
        console.error("What's document, prescious?");
    } else {
        console.log("document is: " + typeof document);
    }
    if (typeof window === 'undefined') {
        console.error("What's window, prescious?");
    }else {
        console.log("window is: " + typeof window);
    }
    if (typeof navigator === 'undefined') {
        console.error("What's navigator, prescious?");
    }else {
        console.log("navigator is: " + typeof navigator);
    }
    if (typeof window.navigator === 'undefined') {
        console.error("What's window.navigator, prescious?");
    }else {
        console.log("window.navigator is: " + typeof window.navigator);
    }

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
