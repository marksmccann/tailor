import ts from 'typescript';

import parseLiteral, { LiteralDetails } from './parseLiteral';
import isBooleanLiteral from './isBooleanLiteral';

export type ExpressionDetails = LiteralDetails | { kind: 'UnknownExpression' }

/**
 * Parse an `Expression` object to derive relevant details from.
 * @param node The `Expression` node to parse
 * @returns The derived detais
 */
export default function parseExpression(node: ts.Expression): ExpressionDetails {
    if (ts.isStringLiteral(node) || isBooleanLiteral(node) || ts.isNumericLiteral(node)) {
        return parseLiteral(node);
    }

    console.error(`Failed to parse expression of type "${node.kind}"`);

    return { kind: 'UnknownExpression' };
}