import React from 'react';

import Button from './Button';

import styles from './ColorButtons.scss';

export default ({colors, selectedIndex, clickFunc}) =>
    <ul className="colorList">
        {colors.map( (color, i) =>

            <li key={i} className={`color${i === selectedIndex ? ' selected' : ''}`}>
                <Button clickFunc={ ()=>clickFunc(i) } style={{backgroundColor: color, borderColor: color}}>
                    {color}
                </Button>
            </li>

        )}
    </ul>;
