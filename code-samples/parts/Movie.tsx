import {Part} from "@enonic/react-components";
import React from 'react';
import styles from './MoviePage.module.css';

export const Movie = (props) => {
    const {
        names,
        paths,
        componentRegistry,
        trailer,
        name,
        photo,
        website,
        release,
        cast,
        director,
        subtitle,
        abstract,
        restphotos,
        ...extraProps
    } = props;

    return (
        <Part {...extraProps}>
            <div className={styles.moviePage}>
                <header>
                    <h1><a href={props.trailer} className={styles.sneakyTitle}>{props.name}</a></h1>
                </header>

                <main className={styles.main}>
                    <div className={styles.flexy}>
                        {props.photo && (
                            <section className={styles.firstPhoto}>
                                <a href={props.trailer}>
                                    <img
                                        src={props.photo.imageUrl}
                                        alt={props.photo.title}
                                        title={props.photo.title}
                                        className={styles.featuredImage}
                                        loading="eager"
                                        height={1200}
                                        width={800}
                                    />
                                </a>
                            </section>
                        )}

                        <div className={styles.blocky}>
                            <div>
                                <div>
                                    {props.website && (
                                        <>
                                            <h2>
                                                Official Website
                                            </h2>
                                            <p className={styles.website}>
                                                <a href={props.website} className={styles.sneakyLink} target="_blank"
                                                   rel="noopener noreferrer">
                                                    {props.website}
                                                </a>
                                            </p>
                                        </>
                                    )}
                                    {props.release && (
                                        <>
                                            <h2>Release Date:</h2>
                                            <p className={styles.date}>{props.release}</p>
                                        </>
                                    )}
                                </div>

                                {props.cast.length > 0 && (
                                    <section className={styles.cast}>
                                        <h2>Cast</h2>
                                        <ul>
                                            {props.cast.map((member, index) => (
                                                <li key={index}>
                                                    <a href={member.castUrl} className={styles.sneakyCastLink}>
                                                        <img
                                                            src={member.photoUrl}
                                                            alt={member.actorName}
                                                            height={150}
                                                            width={150}
                                                        />
                                                        <p><strong>{member.actorName}</strong> as {member.character}
                                                        </p>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}
                            </div>
                            <div>
                                {props.director && (
                                    <section className={styles.director}>
                                        <h2>Director</h2>
                                        <a href={props.director.url} className={styles.sneakyLink}>
                                            <h3>{props.director.name}</h3>
                                            <img
                                                className={styles.directorImg}
                                                src={props.director.photo}
                                                alt={"Director"}
                                                height={200}
                                                width={300}
                                            />
                                        </a>
                                    </section>
                                )}
                            </div>
                        </div>
                    </div>

                    <h2>{props.subtitle}</h2>

                    <section className={styles.abstract}>
                        <p>{props.abstract}</p>
                    </section>

                    {props.restphotos && props.restphotos.length > 0 && (
                        <section className={styles.photos}>
                            <div className={styles.photoGrid}>
                                <div className={styles.photoScroll}>
                                    {props.restphotos.map((photo, index) => (
                                        <img
                                            key={index}
                                            src={photo.imageUrl}
                                            alt={photo.title}
                                            title={photo.title}
                                            className={styles.photoImg}
                                            loading="lazy"
                                            height={220}
                                            width={340}
                                        />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </Part>
    );
};
