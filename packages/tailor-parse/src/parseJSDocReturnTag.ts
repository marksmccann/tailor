import ts from 'typescript';

import parseTypeNode from './parseTypeNode';

/**
 * The information derived from an `JSDocReturnTag` node.
 */
export interface JSDocReturnTagDetails {
    /**
     * The JSDoc tag type.
     */
    tag: '@return' | '@returns';

    /**
     * The type of the return value represented as a string.
     */
    type: string;

    /**
     * The text of the comment associated with the tag.
     */
    description: string;
}

/**
 * Parse an `JSDocReturnTag` object to derive relevant details from.
 * @param node The `JSDocReturnTag` node to parse
 * @returns The derived detais
 */
export default function parseJSDocReturnTag(node: ts.JSDocReturnTag): JSDocReturnTagDetails {
    const { comment, typeExpression } = node;
    let type = '';
    let description = '';

    if (typeof comment === "string") {
        description = comment;
    } else if (comment !== undefined) {
        // TODO: Parse `ts.NodeArray<ts.JSDocComment>` type
        console.error("Unknown comment type for `JSDocReturnTag` node");
    }

    if (typeExpression) {
        const details = parseTypeNode(typeExpression.type);
        type = details.type;
    }

    return {
        tag: '@returns',
        description,
        type,
    };
}