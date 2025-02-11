import ts from 'typescript';

/**
 * The information derived from an `Identifier` node.
 */
export interface IdentifierDetails {
    text: string,
}

/**
 * Parse an `Identifier` object to derive relevant details from.
 * @param node The `Identifier` node to parse
 * @returns The derived detais
 */
export default function parseIdentifier(node: ts.Identifier): IdentifierDetails {
    const { escapedText } = node;
    let text = '';

    if (typeof escapedText === "string") {
        text = escapedText;
    } else {
        console.error('Unknown type for identifier "escapedText"');
    }

    return { text };
}