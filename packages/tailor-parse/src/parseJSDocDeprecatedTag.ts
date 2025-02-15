import ts from 'typescript';

/**
 * The information derived from an `JSDocDeprecatedTag` node.
 */
export interface JSDocDeprecatedTagDetails {
    /**
     * The JSDOC tag type.
     */
    tag: '@deprecated';

    /**
     * The text of the comment associated with the tag.
     */
    description: string;
}

/**
 * Parse an `JSDocDeprecatedTag` object to derive relevant details from.
 * @param node The `JSDocDeprecatedTag` node to parse
 * @returns The derived detais
 */
export default function parseJSDocDeprecatedTag(node: ts.JSDocDeprecatedTag): JSDocDeprecatedTagDetails {
    const { comment } = node;
    let description = '';

    if (typeof comment === "string") {
        description = comment;
    } else if (comment !== undefined) {
        // TODO: Parse `ts.NodeArray<ts.JSDocComment>` type
        console.error("Unknown comment type for `JSDocDeprecatedTag` node");
    }

    return {
        tag: '@deprecated',
        description,
    };
}