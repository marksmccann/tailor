import ts from 'typescript';

/**
 * A helper function to determine if a node is a boolean literal.
 * @param node The node to check
 * @returns Whether or not the node is a boolean literal
 */
export default function isBooleanLiteral(node: ts.Node): node is ts.BooleanLiteral {
    return (
        node.kind === ts.SyntaxKind.TrueKeyword ||
        node.kind === ts.SyntaxKind.FalseKeyword ||
        node.kind === ts.SyntaxKind.BooleanKeyword
    );
}