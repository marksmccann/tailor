import ts from 'typescript';

import parseJSDoc, { JSDocDetails } from './parseJSDoc';
import parseTypeNode from './parseTypeNode';
import parseIdentifier from './parseIdentifier';
import parseExpression from './parseExpression';
import parseModifierArray, { ModifierArrayDetails } from './parseModifierArray';

/**
 * The information derived from a `VariableStatement` object.
 */
export type VariableStatementDetails =
    Pick<JSDocDetails, 'description' | 'deprecated'> &
    Pick<ModifierArrayDetails, 'exportType'> &
    {
        /**
         * The kind of variable being defined.
         */
        kind: 'literal' | 'unknown',

        /**
         * The name of the function. Will be an empty string if anonymous.
         */
        name: string

        /**
         * The expression for the function's type as a string.
         */
        type: string,
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
    let exportType: VariableStatementDetails['exportType'] = 'none';
    let type: VariableStatementDetails['type'] = '';
    let kind: VariableStatementDetails['kind'] = 'unknown';

    if (jsDocNodeArray && jsDocNodeArray[0]) {
        const details = parseJSDoc(jsDocNodeArray[0]);

        description = details.description;
        deprecated = details.deprecated;
    }

    if (modifiers) {
        const details = parseModifierArray(modifiers);

        exportType = details.exportType;
    }

    if (firstDeclaration) {
        const { name: variableName, initializer, type: typeAnnotation } = firstDeclaration;

        if (typeAnnotation) {
            const details = parseTypeNode(typeAnnotation);

            type = details.type;
        }

        if (ts.isIdentifier(variableName)) {
            const details = parseIdentifier(variableName);

            name = details.text;
        }

        // Right-hand side of declaration
        if (initializer) {
            const details = parseExpression(initializer);

            if (details.kind === 'literal') {
                kind = 'literal';
            }

            // Derive type from expression if not explicitly annotated
            if (details.kind === 'literal' && !type) {
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
        exportType,
        kind,
        type,
    };
}