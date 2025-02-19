import ts from "typescript";

import parseLiteral from "./parseLiteral";

/**
 * The information derived from a `TypeNode` object.
 */
export interface TypeNodeDetails {
    /**
     * The inferred type expression for the node. Will be `any` if the type cannot be determined.
     */
    type: string,
}

/**
 * Parse a `TypeNode` object to derive relevant details from it.
 * @param node The `TypeNode` object to parse
 * @returns The derived type expression
 */
export default function parseTypeNode(node: ts.TypeNode): TypeNodeDetails {
    let type = 'any';

    if (node.kind === ts.SyntaxKind.AnyKeyword) {
        type = 'any';
    } else if (node.kind === ts.SyntaxKind.BigIntKeyword) {
        type = 'bigint';
    } else if (node.kind === ts.SyntaxKind.BooleanKeyword) {
        type = 'boolean';
    } else if (node.kind === ts.SyntaxKind.FalseKeyword) {
        type = 'false';
    } else if (node.kind === ts.SyntaxKind.NeverKeyword) {
        type = 'never';
    } else if (node.kind === ts.SyntaxKind.NullKeyword) {
        type = 'null';
    } else if (node.kind === ts.SyntaxKind.NumberKeyword) {
        type = 'number';
    } else if (node.kind === ts.SyntaxKind.ObjectKeyword) {
        type = 'object';
    } else if (node.kind === ts.SyntaxKind.StringKeyword) {
        type = 'string';
    } else if (node.kind === ts.SyntaxKind.SymbolKeyword) {
        type = 'symbol';
    } else if (node.kind === ts.SyntaxKind.TrueKeyword) {
        type = 'true';
    } else if (node.kind === ts.SyntaxKind.UndefinedKeyword) {
        type = 'undefined';
    } else if (node.kind === ts.SyntaxKind.UnknownKeyword) {
        type = 'unknown';
    } else if (node.kind === ts.SyntaxKind.VoidKeyword) {
        type = 'void';
    } else if (node.kind === ts.SyntaxKind.UnionType) {
        const { types } = node as ts.UnionTypeNode;

        // Combine the types into a union string
        type = types.map(parseTypeNode).join(" | ");
    } else if (node.kind === ts.SyntaxKind.LiteralType) {
        const { literal } = node as ts.LiteralTypeNode;
        const details = parseLiteral(literal);

        if (details.type === 'string') {
            type = `'${details.text}'`;
        } else {
            type = details.text;
        }
    } else {
        console.error(`Failed to parse 'TypeNode' of unknown kind for node: "${JSON.stringify(node)}"`);
    }

    return { type };
}