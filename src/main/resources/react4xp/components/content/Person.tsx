import {componentRegistry} from '/react4xp/componentRegistry';
import {RichText} from '@enonic/react-components';
import React from 'react'
import styles from './Person.module.css';

export const Person = (props) => {
	const {parent, displayName, photo, restPhotos, bioHtml, birthDate} = props as any;
	return (
		<div className={styles.person}>
			<div className={"back"}>
				<a href={parent}>
					<p>Back</p>
				</a>
			</div>
			<h1>{displayName}</h1>
			<p>{birthDate}</p>
			<div>
				{
					photo ? (
						<>
							<div className={styles.photos}>
								<img src={photo.imageUrl}
									 title={photo.title}
									 alt={photo.title}
									 height={675}
									 width={1200}
									 loading="eager"
								/>
							</div>
						</>
					) : (
						<p>No photo available</p>
					)
				}
				{restPhotos && restPhotos.length > 0 && (
					<>
						<h2>Photos</h2>
						<div className={styles.photoContainer}>
							<div className={styles.photoGrid}>
								<div className={styles.photoScroll}>
									{restPhotos.map((photo, index) => (
										<img key={index}
											 src={photo.imageUrl}
											 title={photo.title}
											 alt={photo.title}
											 height={175}
											 width={175}
										/>
									))}
								</div>
							</div>
						</div>
					</>
				)}
			</div>
			{bioHtml && (
				<>
					<h2>Bio</h2>
					<div className={styles.richText}>
						<RichText
							data={bioHtml}
							componentRegistry={componentRegistry}
							loading="lazy"
						/>
					</div>
				</>
			)}
		</div>
	)
}
