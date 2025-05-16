import {componentRegistry} from '/react4xp/componentRegistry';
import {Regions,} from '@enonic/react-components';
import dayjs from 'dayjs';
import React from 'react'
import styles from './Page.module.css';

export const Page = (props: any) => {

    const regionsProps = {componentRegistry, regions: props.regions};
    return (
        <div className={styles[props.name]}>
            <Regions {...regionsProps} />
            <div>Page: {dayjs().format()}</div>
        </div>
    );
};