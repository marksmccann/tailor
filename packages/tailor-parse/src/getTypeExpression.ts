import ts from "typescript";

import parseLiteral from "./parseLiteral";

export default function getTypeExpression(node: ts.TypeNode): string {
    let typeExpression = 'any';

    // Keyword
    if (node.kind === ts.SyntaxKind.AnyKeyword) {
        typeExpression = 'any';
    } else if (node.kind === ts.SyntaxKind.BigIntKeyword) {
        typeExpression = 'bigint';
    } else if (node.kind === ts.SyntaxKind.BooleanKeyword) {
        typeExpression = 'boolean';
    } else if (node.kind === ts.SyntaxKind.FalseKeyword) {
        typeExpression = 'false';
    } else if (node.kind === ts.SyntaxKind.NeverKeyword) {
        typeExpression = 'never';
    } else if (node.kind === ts.SyntaxKind.NullKeyword) {
        typeExpression = 'null';
    } else if (node.kind === ts.SyntaxKind.NumberKeyword) {
        typeExpression = 'number';
    } else if (node.kind === ts.SyntaxKind.ObjectKeyword) {
        typeExpression = 'object';
    } else if (node.kind === ts.SyntaxKind.StringKeyword) {
        typeExpression = 'string';
    } else if (node.kind === ts.SyntaxKind.SymbolKeyword) {
        typeExpression = 'symbol';
    } else if (node.kind === ts.SyntaxKind.TrueKeyword) {
        typeExpression = 'true';
    } else if (node.kind === ts.SyntaxKind.UndefinedKeyword) {
        typeExpression = 'undefined';
    } else if (node.kind === ts.SyntaxKind.UnknownKeyword) {
        typeExpression = 'unknown';
    } else if (node.kind === ts.SyntaxKind.VoidKeyword) {
        typeExpression = 'void';
    } else if (node.kind === ts.SyntaxKind.UnionType) {
        const unionType = node as ts.UnionTypeNode;
        typeExpression = unionType.types.map(getTypeExpression).join("|");
    } else if (node.kind === ts.SyntaxKind.LiteralType) {
        const { literal } = node as ts.LiteralTypeNode;
        // @ts-expect-error - Need to account for `LiteralExpression` and `PrefixUnaryExpression`
        const { type, text } = parseLiteral(literal);
        typeExpression = (type === 'string') ? `'${text}'` : text;
    } else if (node !== undefined) {
        console.error(`Unknown type expression: ${node.kind}`);
    }

    return typeExpression;
}
