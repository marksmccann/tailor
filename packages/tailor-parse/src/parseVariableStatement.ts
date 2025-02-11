import ts from 'typescript';

import parseJSDoc, { JSDocDetails } from './parseJSDoc';
import getExportType, { ExportType } from './getExportType';
import parseIdentifier, { IdentifierDetails } from './parseIdentifier';
import parseExpression from './parseExpression';

/**
 * The information derived from a `VariableStatement` object.
 */
export type VariableStatementDetails = Pick<JSDocDetails, 'description' | 'deprecated'> & {
    export: ExportType,
    name: IdentifierDetails['text'],
    type: string,
    kind: 'Literal' | 'Unknown',
};

/**
 * Parse a `VariableStatement` object to derive relevant details from it.
 * @param node The `VariableStatement` object to parse
 * @returns The derived details
 */
export default function parseVariableStatement(node: ts.VariableStatement): VariableStatementDetails {
    const { declarationList, modifiers } = node;
    const [firstDeclaration] = declarationList.declarations;
    // @ts-expect-error - "jsDoc" key is missing from type
    const jsDocNodeArray = node.jsDoc as ts.NodeArray<ts.JSDoc> | undefined;
    const isConstant = declarationList.flags === 2;

    // Details to collect
    let name: VariableStatementDetails['name'] = '';
    let description: VariableStatementDetails['description'] = '';
    let deprecated: VariableStatementDetails['deprecated'] = false;
    let exportType: VariableStatementDetails['export'] = false;
    let type: VariableStatementDetails['type'] = '';
    let kind: VariableStatementDetails['kind'] = 'Unknown';

    // JSDoc details
    if (jsDocNodeArray && jsDocNodeArray[0]) {
        const details = parseJSDoc(jsDocNodeArray[0]);

        description = details.description;
        deprecated = details.deprecated;
    }

    // Export type
    if (modifiers) {
        console.log(modifiers[1]);
        exportType = getExportType(modifiers);
    }

    // Primary variable declaration
    if (firstDeclaration) {
        const { name: variableName, initializer } = firstDeclaration;

        // Left-hand side of declaration
        if (ts.isIdentifier(variableName)) {
            const details = parseIdentifier(variableName);

            name = details.text;
        }

        // Right-hand side of declaration
        if (initializer) {
            const details = parseExpression(initializer);

            if (details.kind === 'Literal') {
                kind = 'Literal';

                if (details.type === 'string') {
                    type = isConstant ? `'${details.text}'` : 'string';
                } else if (details.type === 'boolean') {
                    type = isConstant ? details.text : 'boolean';
                } else if (details.type === 'number') {
                    type = isConstant ? details.text : 'number';
                }
            }
        }
    }

    return {
        name,
        description,
        deprecated,
        export: exportType,
        kind,
        type,
    };
}