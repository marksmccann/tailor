import ts from 'typescript';

export default function isBooleanLiteral(node: ts.Node): node is ts.BooleanLiteral {
    return (
        node.kind === ts.SyntaxKind.TrueKeyword ||
        node.kind === ts.SyntaxKind.FalseKeyword ||
        node.kind === ts.SyntaxKind.BooleanKeyword
    );
}