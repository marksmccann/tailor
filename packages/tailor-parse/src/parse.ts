
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

export type TailorNode = LiteralNode | FunctionNode | {
    readonly kind: 'Unknown';
}

export default function parse(sourceText: string): TailorNode[] {
    const result: TailorNode[] = [];
    const sourceFile = ts.createSourceFile(
        '',
        sourceText,
        ts.ScriptTarget.ES2015,
        true
    );

    ts.forEachChild(sourceFile, (node) => {
        let tailorNode: TailorNode = { kind: 'Unknown' };
        let nodeType: string = 'Unknown';

        // Ignore irrelevant node types
        if (node.kind === ts.SyntaxKind.EndOfFileToken || ts.isEmptyStatement(node)) {
            return;
        }

        if (ts.isFunctionDeclaration(node)) {
            const { kind, ...rest } = parseFunctionDeclaration(node);

            if (kind === 'NamedFunction') {
                tailorNode = { ...rest, kind: 'Function' };
            }
        } else if (ts.isVariableStatement(node)) {
            const { kind, ...rest } = parseVariableStatement(node);

            if (kind === 'Literal') {
                tailorNode = { ...rest, kind: 'Literal' };
            }
        }

        if (tailorNode.kind === 'Unknown') {
            console.error(`Failed to parse node of type "${nodeType}".`);
            console.log(node);
        }


        result.push(tailorNode);
    });

    return result;
}