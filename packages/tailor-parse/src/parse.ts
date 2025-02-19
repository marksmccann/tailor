
import ts from "typescript";

import walk from './walk';
import { Artifact } from './types';
import parseVariableStatement from "./parseVariableStatement";
import parseFunctionDeclaration from "./parseFunctionDeclaration";

/**
 * Extract organized documentation information for each identifiable
 * artifact found within a JavaScript or TypeScript file.
 * @param sourceText The raw source code from the file
 * @returns The list of artifacts containing documentation information
 */
export default function parse(sourceText: string): Artifact[] {
    const artifacts: Artifact[] = [];

    walk(
        ts.createSourceFile(
            '',
            sourceText,
            ts.ScriptTarget.ES2015,
            true
        ),
        {
            FunctionDeclaration(node) {
                const details = parseFunctionDeclaration(node);

                artifacts.push({
                    kind: 'Function',
                    name: details.name,
                    export: details.exportType,
                    type: details.type,
                    description: details.description,
                    deprecated: details.deprecated,
                    parameters: details.parameters,
                    returns: details.returns,
                });
            },
            VariableStatement(node) {
                const details = parseVariableStatement(node);

                if (details.kind === 'literal') {
                    artifacts.push({
                        kind: 'Simple',
                        name: details.name,
                        export: details.exportType,
                        type: details.type,
                        description: details.description,
                        deprecated: details.deprecated,
                    });
                }
            }
        },
    );

    return artifacts;
}
