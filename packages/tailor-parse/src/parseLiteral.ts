import ts from 'typescript';

import isBooleanLiteral from './isBooleanLiteral';

/**
 * The list of literal nodes that can be parsed by the `parseLiteral` function.
 */
type ParseableLiterals = {
    number: ts.NumericLiteral
    boolean: ts.BooleanLiteral
    string: ts.StringLiteral
    null: ts.NullLiteral
    expression: ts.LiteralExpression
    'prefix-unary': ts.PrefixUnaryExpression
    template: ts.TemplateExpression
    regex: ts.RegularExpressionLiteral
};

/**
 * The information derived from a `<Type>Literal` node.
 */
export interface LiteralDetails {
    /**
     * The type of literal the node represents. Will be `'unknown'` if the type cannot be determined.
     */
    type: keyof ParseableLiterals | 'unknown',
    /**
     * The value of the literal represented as a string.
     */
    text: string,
}

/**
 * Parse a `<Type>Literal` object to derive relevant details from.
 * @param node The literal node to parse
 * @returns The derived detais
 */
export default function parseLiteral(node: ParseableLiterals[keyof ParseableLiterals]): LiteralDetails {
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
    } else if (node.kind === ts.SyntaxKind.NullKeyword) {
        type = 'null';
        text = 'null';
    } else if (ts.isRegularExpressionLiteral(node)) {
        type = 'regex';
        text = node.text;
    } else if (ts.isTemplateExpression(node)) {
        // TODO: Implement parsing for template expressions
        type = 'template';
    } else if (ts.isPrefixUnaryExpression(node)) {
        // TODO: Implement parsing for template expressions
        type = 'prefix-unary';
    } else if (ts.isLiteralExpression(node)) {
        type = 'expression';
        text = node.text;
    } else {
        console.error(`Failed to parse unrecognized literal node: "${JSON.stringify(node)}"`);
    }

    return { type, text };
}