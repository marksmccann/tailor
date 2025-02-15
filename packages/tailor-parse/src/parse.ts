import ts from "typescript";

import parseVariableStatement from "./parseVariableStatement";
import parseFunctionDeclaration from "./parseFunctionDeclaration";

import { Artifact } from "./types";
import parseSource from "./parseSource";

/**
 * Parse the source code to extract relevant documentation nodes.
 * @param sourceText The source code to parse
 * @returns The list of nodes parsed from the source code
 */
export default function parse(sourceText: string): Artifact[] {
    const result: Artifact[] = [];

    parseSource(sourceText, (node) => {
        let artifact: Artifact = { kind: 'Unknown' };
        // let nodeType: string = 'Unknown';

        // Ignore irrelevant node types
        if (node.kind === ts.SyntaxKind.EndOfFileToken || ts.isEmptyStatement(node)) {
            return;
        }

        // if (ts.isFunctionDeclaration(node)) {
        //     const { kind, ...rest } = parseFunctionDeclaration(node);

        //     if (kind === 'NamedFunction') {
        //         artifact = { ...rest, kind: 'Function' };
        //     }
        // }else
        if (ts.isVariableStatement(node)) {
            const { kind, description, ...rest } = parseVariableStatement(node);

            if (kind === 'Literal') {
                artifact = { ...rest, kind: 'Simple' };
            }
        }

        // if (artifact.kind === 'Unknown') {
        //     console.error(`Found unidentified artifact.`);
        //     // console.error(`Failed to parse node of type "${nodeType}".`);
        //     // console.log(node);
        // }


        result.push(artifact);
    });

    console.log(result);

    return result;
}