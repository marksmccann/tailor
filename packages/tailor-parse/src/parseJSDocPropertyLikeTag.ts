import ts from 'typescript';

import parseTypeNode from './parseTypeNode';
import parseIdentifier from './parseIdentifier';

/**
 * The information derived from an `JSDocPropertyLikeTag` node.
 */
export interface JSDocPropertyLikeTagDetails {
    /**
     * The JSDoc tag type.
     */
    tag: '@property' | '@argument' | '@param';

    /**
     * The name of the property.
     */
    name: string;

    /**
     * Whether the property is optional.
     */
    optional: boolean;

    /**
     * The type of the property's value represented as a string.
     */
    type: string;

    /**
     * The text of the comment associated with the tag.
     */
    description: string;
}

/**
 * Parse an `JSDocPropertyLikeTag` object to derive relevant details from.
 * @param node The `JSDocPropertyLikeTag` node to parse
 * @returns The derived detais
 */
export default function parseJSDocPropertyLikeTag(node: ts.JSDocPropertyLikeTag): JSDocPropertyLikeTagDetails {
    const { comment, isBracketed, typeExpression, name: nodeName } = node;
    const optional = isBracketed;
    let type = '';
    let name = '';
    let description = '';
    let tag;

    if (typeof comment === "string") {
        description = comment;
    } else if (typeof comment !== "undefined") {
        // TODO: Parse `ts.NodeArray<ts.JSDocComment>` type
        console.error("Unknown comment type for `JSDocPropertyLikeTag` node");
    }

    if (ts.isIdentifier(nodeName)) {
        const details = parseIdentifier(nodeName);
        name = details.text;
    }

    if (typeExpression) {
        const details = parseTypeNode(typeExpression.type);
        type = details.type;
    }

    return {
        type: type,
        name: name,
        description: description,
        optional: optional,
    };
}