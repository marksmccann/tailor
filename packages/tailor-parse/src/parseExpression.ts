import ts from 'typescript';

import parseLiteral, { LiteralDetails } from './parseLiteral';
import isBooleanLiteral from './isBooleanLiteral';

/**
 * The information derived from an `Expression` object.
 */
export type ExpressionDetails = {
    /**
     * A literal expression.
     */
    kind: 'literal',

    /**
     * The type of expression it is.
     */
    type: LiteralDetails['type'],

    /**
     * The test representation of the literal.
     */
    text: string,
} | {
    /**
     * An unknown expression type.
     */
    kind: 'unknown'
}

/**
 * Parse an `Expression` object to derive relevant details from.
 * @param node The `Expression` node to parse
 * @returns The derived detais
 */
export default function parseExpression(node: ts.Expression): ExpressionDetails {
    if (ts.isStringLiteral(node) || isBooleanLiteral(node) || ts.isNumericLiteral(node)) {
        const details = parseLiteral(node);

        return { kind: 'literal', type: details.type, text: details.text };
    }

    console.error(`Failed to parse expression of type "${node.kind}"`);

    return { kind: 'unknown' };
}