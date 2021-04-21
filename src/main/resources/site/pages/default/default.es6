/** Simple page controller, as an example of how to render an XP page with Regions, using only server-side React. */

const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

                                                                                                                            const prettify = (obj, label, suppressCode = false, indent = 0) => {
                                                                                                                                let str = " ".repeat(indent) + (
                                                                                                                                    label !== undefined
                                                                                                                                        ? label + ": "
                                                                                                                                        : ""
                                                                                                                                );

                                                                                                                                if (typeof obj === 'function') {
                                                                                                                                    if (!suppressCode) {
                                                                                                                                        return `${str}···· (function)\n${" ".repeat(indent + 4)}` +
                                                                                                                                            obj.toString()
                                                                                                                                                .replace(
                                                                                                                                                    /\r?\n\r?/g,
                                                                                                                                                    `\n${" ".repeat(indent + 4)}`
                                                                                                                                                ) +
                                                                                                                                            "\n" + " ".repeat(indent) + "····"
                                                                                                                                            ;
                                                                                                                                    } else {
                                                                                                                                        return `${str}···· (function)`;
                                                                                                                                    }

                                                                                                                                } else if (Array.isArray(obj)) {
                                                                                                                                    return obj.length === 0
                                                                                                                                        ? `${str}[]`
                                                                                                                                        : (
                                                                                                                                            `${str}[\n` +
                                                                                                                                            obj.map(
                                                                                                                                                (item, i) =>
                                                                                                                                                    prettify(item, i, suppressCode, indent + 4)
                                                                                                                                            )
                                                                                                                                                .join(",\n") +
                                                                                                                                            `\n${" ".repeat(indent)}]`
                                                                                                                                        );

                                                                                                                                } else if (obj && typeof obj === 'object') {
                                                                                                                                    try {
                                                                                                                                        if (Object.keys(obj).length === 0) {
                                                                                                                                            return `${str}{}`;
                                                                                                                                        } else {
                                                                                                                                            return `${str}{\n` +
                                                                                                                                                Object.keys(obj).map(
                                                                                                                                                    key => prettify(obj[key], key, suppressCode, indent + 4)
                                                                                                                                                ).join(",\n") +
                                                                                                                                                `\n${" ".repeat(indent)}}`
                                                                                                                                        }
                                                                                                                                    } catch (e) {
                                                                                                                                        log.info(e);
                                                                                                                                        return `${str}···· (${typeof obj})\n${" ".repeat(indent + 4)}` +
                                                                                                                                            obj.toString()
                                                                                                                                                .replace(
                                                                                                                                                    /\r?\n\r?/g,
                                                                                                                                                    `\n${" ".repeat(indent + 4)}`
                                                                                                                                                ) +
                                                                                                                                            "\n" + " ".repeat(indent) + `····`;
                                                                                                                                    }
                                                                                                                                } else if (obj === undefined || obj === null) {
                                                                                                                                    return `${str}${obj}`;
                                                                                                                                } else if (JSON.stringify(obj) !== undefined) {
                                                                                                                                    return `${str}` + JSON.stringify(obj, null, 2).replace(
                                                                                                                                        /\r?\n\r?/g,
                                                                                                                                        `\n${" ".repeat(indent + 2)}`
                                                                                                                                    );
                                                                                                                                } else {
                                                                                                                                    return `${str}···· (${typeof obj})\n${" ".repeat(indent + 4)}` +
                                                                                                                                        obj.toString()
                                                                                                                                            .replace(
                                                                                                                                                /\r?\n\r?/g,
                                                                                                                                                `\n${" ".repeat(indent + 4)}`
                                                                                                                                            ) +
                                                                                                                                        "\n" + " ".repeat(indent) + `····`;
                                                                                                                                }
                                                                                                                            };

exports.get = function(request) {

    																													log.info(prettify(request, "Default page request"));
    const content = portal.getContent();
    const entry = portal.getComponent();

    const id = `react4xp_${content._id}`;

    const props = {
        regionsData: content.page.regions,
        names: "main",
        tag: "main",
    };

    const htmlBody = `
                <html>
                    <head>
                        <meta charset="UTF-8" />
                        <title>${content.displayName}</title>
                    </head>
                    <body class="xp-page">
                        <div id="${id}"></div>
                    </body>
                </html>
            `;

    																													log.info("htmlBody: " + htmlBody);

    const output = React4xp.render(
        entry,
        props,
        null,
        {
            id,
            body: htmlBody
        }
    );



    																													log.info(prettify(output, "default page output"));

    // The unclosed !DOCTYPE tag is not XML-compliant, and causes an error if used in the body parameter of React4xp.render.options above.
    // Therefore, added here:
    output.body = '<!DOCTYPE html>' + output.body;

    return output;
};
