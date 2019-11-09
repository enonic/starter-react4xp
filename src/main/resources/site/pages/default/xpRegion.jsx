import React from 'react';

const ComponentTag = (component) => (component && component.path) ?
    `\t\t\t\t\t\t\n\t\t\t\t\t\t\t<!--# COMPONENT ${component.path} -->` :
    null;

export default ({
                    content = {},
                    name="main",
                    tag="div"}) =>
{
    const regionContent = ((content.page || {}).regions || {})[name];

    // TODO: sanitize tag and name: not all characters (or tags) are acceptable
    const TAG = (name === "main") ? "main" : tag;

    return <TAG
        data-portal-region={name}
        className="xp-region"
        dangerouslySetInnerHTML={{
            __html: `\t\t\t\t\t${
                regionContent.components && regionContent.components.length > 0 ?
                    regionContent.components
                        .map(component => ComponentTag(component))
                        .join('\n')
                    :
                    ''
                }\t\t\t\t\t\n`
            }}
    ></TAG>;
}
