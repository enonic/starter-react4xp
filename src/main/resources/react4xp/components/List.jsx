import React from 'react';

export default ({colors, selectedIndex, func}) =>
    <ul className="colorList">
        {colors.map( (color, i) =>

            <li key={i}
                class={`color${i === selectedIndex ? ' selected' : ''}`} >
                <button type="button"
                        onClick={() => func(i)}
                        style={{backgroundColor: color, borderColor: color}} >
                    {color}
                </button>
            </li>

        )}
    </ul>;
