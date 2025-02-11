
/* eslint-disable */

import ts from "typescript";

// import parseJSDoc from "./parseJSDoc";
import { ExportType } from "./getExportType";
import parseVariableStatement from "./parseVariableStatement";
import parseFunctionDeclaration from "./parseFunctionDeclaration";

export interface NodeBase<T> {
    readonly kind: T;
    readonly name: string;
    readonly type: string;
    readonly export: ExportType;
}

export interface FunctionNode extends NodeBase<'Function'> { }

export interface LiteralNode extends NodeBase<'Literal'> { }

export type DocNode = LiteralNode | FunctionNode | {
    readonly kind: 'Unknown';
}

/**
 * Parse the source code to extract relevant documentation nodes.
 * @param sourceText The source code to parse
 * @returns The list of nodes parsed from the source code
 */
export default function parse(sourceText: string): DocNode[] {
    const result: DocNode[] = [];
    const sourceFile = ts.createSourceFile(
        '',
        sourceText,
        ts.ScriptTarget.ES2015,
        true
    );

    ts.forEachChild(sourceFile, (node) => {
        let DocNode: DocNode = { kind: 'Unknown' };
        let nodeType: string = 'Unknown';

        // Ignore irrelevant node types
        if (node.kind === ts.SyntaxKind.EndOfFileToken || ts.isEmptyStatement(node)) {
            return;
        }

        if (ts.isFunctionDeclaration(node)) {
            const { kind, ...rest } = parseFunctionDeclaration(node);

            if (kind === 'NamedFunction') {
                DocNode = { ...rest, kind: 'Function' };
            }
        } else if (ts.isVariableStatement(node)) {
            const { kind, ...rest } = parseVariableStatement(node);

            if (kind === 'Literal') {
                DocNode = { ...rest, kind: 'Literal' };
            }
        }

        if (DocNode.kind === 'Unknown') {
            console.error(`Failed to parse node of type "${nodeType}".`);
            console.log(node);
        }


        result.push(DocNode);
    });

    return result;
}