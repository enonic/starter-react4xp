import type {HelloProps} from '/types/HelloProps';
import React, {useState} from 'react';
import styles from './Hello.module.css';

export const Hello = ({title, initialCount}: HelloProps) => {
    const [count, setCount] = useState(initialCount);

    return (
        <div>
            <section className={styles.helloContainer}>
                <h1>{title}</h1>
                <button onClick={() => setCount(count + 1)}>{count} Clicks!</button>
            </section>
        </div>
    );
};
