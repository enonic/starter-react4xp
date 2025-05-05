import React from 'react';
import styles from './Footer.module.css';


export interface FooterProps {
	logoUrl: string;
}

const Footer = ({logoUrl}: FooterProps) => (
	<footer className={styles.footer}>
		<div className={styles.footerContainer}>
			<p>
				{`© ${new Date().getFullYear()}, Built with `}
				<a href="https://reactjs.org">React</a>
				{` and Powered by `}
				<a href="https://enonic.com">Enonic XP</a>
			</p>
		</div>
		{/* Render logo if available */}
		{logoUrl && (
			<div className={styles.logoContainer}>
				<img src={logoUrl}
					 width={32}
					 height={42}
					 alt="Enonic XP logo"/>
			</div>
		)}
	</footer>
);

export default Footer;
