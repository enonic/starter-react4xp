import {Regions,} from '@enonic/react-components';
import dayjs from 'dayjs';
import React from 'react'
import styles from './Page.module.css';

export const Page = (props: any) => {


    return (
        <div className={styles[props.name]}>
            <Regions {...props} />
            <div>Page: {dayjs().format()}</div>
        </div>
    );
};