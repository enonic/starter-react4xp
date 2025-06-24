import type {HelloProps} from '/types/HelloProps';
import * as React from 'react';
import styles from './Hello.module.css';

export const Hello = ({title, initialCount}: HelloProps) => {
    const [count, setCount] = React.useState(initialCount);

    return (
        <section className={`helloPage ${styles.helloContainer}`}>
                <h1>{title}</h1>
                <button onClick={() => setCount(count + 1)}>{count} Clicks!</button>
            </section>
    );
};