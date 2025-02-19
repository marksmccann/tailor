import ts from "typescript";

// import getTypeExpression from "./getTypeExpression";

import parseJSDocDeprecatedTag from "./parseJSDocDeprecatedTag";
import parseJSDocReturnTag, { JSDocReturnTagDetails } from "./parseJSDocReturnTag";
import parseJSDocPropertyLikeTag, { JSDocPropertyLikeTagDetails } from "./parseJSDocPropertyLikeTag";

/**
 * The information derived from an `JSDoc` node.
 */
export interface JSDocDetails {
    /**
     * The text of the comment associated with the comment block.
     */
    description: string;

    /**
     * Whether the deprecated tag is present or not.
     */
    deprecated: boolean | string,

    /**
     * The information for the return statement.
     */
    returns: JSDocReturnTagDetails,

    /**
     * A list of information about the parameters.
     */
    parameters: Array<JSDocPropertyLikeTagDetails>

    /**
     * A list of information about the properties.
     */
    properties: Array<JSDocPropertyLikeTagDetails>
}

/**
 * Parse an `JSDoc` object to derive relevant details from.
 * @param node The `JSDoc` node to parse
 * @returns The derived detais
 */
export default function parseJSDoc(node: ts.JSDoc): JSDocDetails {
    const { comment } = node;
    const parameters: JSDocDetails['parameters'] = [];
    const properties: JSDocDetails['properties'] = [];
    let description: JSDocDetails['description'] = '';
    let deprecated: JSDocDetails['deprecated'] = false;
    let returns: JSDocDetails['returns'] = { type: '', description: '' };

    if (typeof comment === "string") {
        description = comment;
    } else if (comment !== undefined) {
        // TODO: Parse `ts.NodeArray<ts.JSDocComment>` type
        console.error("Unknown JSDoc node comment type");
    }

    node.tags?.forEach((tag) => {
        if (ts.isJSDocDeprecatedTag(tag)) {
            const details = parseJSDocDeprecatedTag(tag);

            if (details.description) {
                deprecated = details.description;
            } else {
                deprecated = true;
            }
        } else if (ts.isJSDocReturnTag(tag)) {
            const details = parseJSDocReturnTag(tag);

            returns = {
                description: details.description,
                type: details.type,
            };
        } else if (ts.isJSDocParameterTag(tag)) {
            const details = parseJSDocPropertyLikeTag(tag);

            parameters.push({
                type: details.type,
                description: details.description,
                name: details.name,
                optional: details.optional,
            })
        } else if (ts.isJSDocPropertyTag(tag)) {
            const details = parseJSDocPropertyLikeTag(tag);

            properties.push({
                type: details.type,
                description: details.description,
                name: details.name,
                optional: details.optional,
            })
        }
    });

    return { description, deprecated, returns, parameters, properties };
}