import type {ComponentProps} from '@enonic/react-components';
import * as React from 'react';
import styles from './Hello.module.css';

export interface HelloProps
    extends Record<string, unknown> {
    title: string
    initialCount: number
}

export const Hello = (props: ComponentProps) => {
    const {title, initialCount} = props.data as HelloProps;
    const [count, setCount] = React.useState(initialCount);
    return (
        <section className={`helloPage ${styles.helloContainer}`}>
            <h1>{title}</h1>
            <button onClick={() => setCount(count + 1)}>{count} Clicks!</button>
        </section>
    );
};