import React from 'react';
import styles from './styles.scss';

export default (props) => <p className={styles.testStyle}>Hello {props.greetee}!</p>;
