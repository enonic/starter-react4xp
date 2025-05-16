import {Layout} from '@enonic/react-components';
import dayjs from 'dayjs';
import React from 'react'
import styles from './TwoColumn.module.css';


export const TwoColumnLayout = (props: any,) => {

    return (
        <>
            <Layout className={styles[props.tags]} {...props}/>
            <div>Layout:{dayjs().format()}</div>
        </>
    );
};