import {Layout} from '@enonic/react-components';
import React from 'react'
import styles from './TwoColumn.module.css';


export const TwoColumnLayout = (props: any,) => {

	return (
		<>
			<Layout className={styles.row} {...props}>
			</Layout>
		</>
	);
};
