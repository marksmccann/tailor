import ts from 'typescript';

import isBooleanLiteral from './isBooleanLiteral';

/**
 * The information derived from a `<Type>Literal` node.
 */
export interface LiteralDetails {
    kind: 'Literal',
    type: 'string' | 'number' | 'boolean' | 'unknown',
    text: string,
}

/**
 * Parse a `<Type>Literal` object to derive relevant details from.
 * @param node The literal node to parse
 * @returns The derived detais
 */
export default function parseLiteral(node: ts.NumericLiteral | ts.BooleanLiteral | ts.StringLiteral): LiteralDetails {
    let type: LiteralDetails['type'] = 'unknown';
    let text = '';

    if (ts.isStringLiteral(node)) {
        type = 'string';
        text = node.text;
    } else if (ts.isNumericLiteral(node)) {
        type = 'number';
        text = node.text;
    } else if (isBooleanLiteral(node)) {
        type = 'boolean';
        text = String(node.kind === ts.SyntaxKind.TrueKeyword);
    }

    return { kind: 'Literal', type, text };
}