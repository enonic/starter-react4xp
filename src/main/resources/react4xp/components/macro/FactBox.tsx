import {MacroComponentParams} from '@enonic/react-components';
import React from 'react';
import styles from './FactBox.module.css';


export const Factbox = ({config, children}: MacroComponentParams) => {
	// Creating an object for dangerouslySetInnerHTML
	return (
		<ins className={styles.factbox}>
			<i className={styles.icon}/>
			<strong className={styles.header}>{config.header ? config.header as string : "Fact Box"}</strong>
			<div className={styles.bodyContent}> {children}</div>
		</ins>
	);
};

