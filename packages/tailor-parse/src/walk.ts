import ts from "typescript";

/**
 * A helper for walking through the first level of a TypeScript abstract syntax tree.
 * @param sourceFile The source file to walk through
 * @param vistiors A series of callback functions called for corresponding node types
 */
export default function walk(sourceFile: ts.SourceFile, visitors: {
    FunctionDeclaration?: (node: ts.FunctionDeclaration) => void;
    VariableStatement?: (node: ts.VariableStatement) => void;
}): void {
    ts.forEachChild(sourceFile, (node) => {
        Object.entries(visitors).forEach(([kind, callback]) => {
            // @ts-expect-error - unknown key of enum
            if (node.kind === ts.SyntaxKind[kind]) {
                callback.call(null, node);
            }
        });
    });
}