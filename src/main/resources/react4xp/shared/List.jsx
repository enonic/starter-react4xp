import React from 'react';

export default ({colors, selectedIndex, clickFunc}) =>
    <ul className="colorList">
        {colors.map( (color, i) =>

            <li key={i}
                className={`color${i === selectedIndex ? ' selected' : ''}`}
            >
                <button type="button"
                        onClick={() => clickFunc(i)}
                        style={{backgroundColor: color, borderColor: color}}
                >
                    {color}
                </button>
            </li>

        )}
    </ul>;
