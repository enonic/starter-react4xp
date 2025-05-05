import {Regions,} from '@enonic/react-components';
import React from 'react'
import {componentRegistry} from '../../componentRegistry';
import styles from './Page.module.css';

export const Page = (props: any) => {
	const page = props.page;
	if (!page.regions || !Object.keys(page.regions).length) {
		page.regions = {
			main: {
				name: 'main',
				components: [],
			}
		}
	}
	const regionsProps = {componentRegistry, regions: page.regions}
	return (
		<div className={styles.page}>
			{props.parent && (
				<div className={"back"}>
					<a href={props.parent}>
						<p>Back</p>
					</a>
				</div>
			)}
			<Regions {...regionsProps} />
		</div>
	);
};
