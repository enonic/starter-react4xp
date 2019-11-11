import React from 'react';
import RegionRange from 'react4xp-templates/RegionRange';

export default ({content}) =>
    <html>
        <head>
            <title>{content.displayName}</title>
            <style>{`
                .monospace {
                    font-family: monospace;
                }
            `}</style>
        </head>

        <body className="xp-page">
            <h1>{content.displayName}</h1>
            <h2>Custom JSX template!</h2>
            <p>This is <span className="monospace">site/pages/default/default.jsx</span>, a JSX local to the current page controller: <b>Default.</b></p>
            <p>Here are a couple of regions:</p>

            <RegionRange {...{content}} />

        </body>
    </html>;
