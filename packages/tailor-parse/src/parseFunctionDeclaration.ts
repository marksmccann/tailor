import ts from 'typescript';

import parseJSDoc, { JSDocDetails } from './parseJSDoc';
import parseModifierArray, { ModifierArrayDetails } from './parseModifierArray';
import parseIdentifier from './parseIdentifier';

/**
 * The information derived from a `FunctionDeclaration` object.
 */
export type FunctionDeclarationDetails =
    Pick<JSDocDetails, 'description' | 'deprecated' | 'parameters' | 'returns'> &
    Pick<ModifierArrayDetails, 'exportType'> &
    {
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
 * Parse a `FunctionDeclaration` object to derive relevant details from it.
 * @param node The `FunctionDeclaration` object to parse
 * @returns The derived details
 */
export default function parseFunctionDeclaration(node: ts.FunctionDeclaration): FunctionDeclarationDetails {
    const { name: functionName, modifiers } = node;
    // @ts-expect-error - "jsDoc" key is missing from type
    const jsDocNodeArray = node.jsDoc as ts.NodeArray<ts.JSDoc> | undefined;
    let name: FunctionDeclarationDetails['name'] = '';
    let exportType: FunctionDeclarationDetails['exportType'] = 'none';
    let description: FunctionDeclarationDetails['description'] = '';
    let deprecated: FunctionDeclarationDetails['deprecated'] = false;
    let parameters: FunctionDeclarationDetails['parameters'] = [];
    let returns: FunctionDeclarationDetails['returns'] = { type: '', description: '' };

    if (functionName && ts.isIdentifier(functionName)) {
        const details = parseIdentifier(functionName);

        name = details.text;
    }

    if (modifiers) {
        const details = parseModifierArray(modifiers);

        exportType = details.exportType;
    }

    if (jsDocNodeArray && jsDocNodeArray[0]) {
        const details = parseJSDoc(jsDocNodeArray[0]);

        description = details.description;
        deprecated = details.deprecated;
        returns = details.returns;
        parameters = details.parameters;
    }

    return {
        name,
        description,
        deprecated,
        exportType,
        parameters,
        returns,
        // TODO: Generate type string
        type: '() => votd',
    };
}