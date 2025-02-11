import ts from "typescript";

export default function getTypeExpression(node: ts.TypeNode): string {
    let typeExpression = "";

    // Keyword
    if (node.kind === ts.SyntaxKind.AnyKeyword) {
        typeExpression = "any";
    } else if (node.kind === ts.SyntaxKind.BigIntKeyword) {
        typeExpression = "bigint";
    } else if (node.kind === ts.SyntaxKind.BooleanKeyword) {
        typeExpression = "boolean";
    } else if (node.kind === ts.SyntaxKind.FalseKeyword) {
        typeExpression = "false";
    } else if (node.kind === ts.SyntaxKind.NeverKeyword) {
        typeExpression = "never";
    } else if (node.kind === ts.SyntaxKind.NullKeyword) {
        typeExpression = "null";
    } else if (node.kind === ts.SyntaxKind.NumberKeyword) {
        typeExpression = "number";
    } else if (node.kind === ts.SyntaxKind.ObjectKeyword) {
        typeExpression = "object";
    } else if (node.kind === ts.SyntaxKind.StringKeyword) {
        typeExpression = "string";
    } else if (node.kind === ts.SyntaxKind.SymbolKeyword) {
        typeExpression = "symbol";
    } else if (node.kind === ts.SyntaxKind.TrueKeyword) {
        typeExpression = "true";
    } else if (node.kind === ts.SyntaxKind.UndefinedKeyword) {
        typeExpression = "undefined";
    } else if (node.kind === ts.SyntaxKind.UnknownKeyword) {
        typeExpression = "unknown";
    } else if (node.kind === ts.SyntaxKind.VoidKeyword) {
        typeExpression = "void";

        // Union
    } else if (node.kind === ts.SyntaxKind.UnionType) {
        const unionType = node as ts.UnionTypeNode;
        typeExpression = unionType.types.map(getTypeExpression).join("|");

        // Other
    } else if (node !== undefined) {
        console.error(`Unknown type expression: ${node.kind}`);
    }

    return typeExpression;
}
