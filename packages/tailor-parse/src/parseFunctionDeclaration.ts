import ts from 'typescript';

import parseJSDoc, { JSDocDetails } from './parseJSDoc';
import getExportType, { ExportType } from './getExportType';
import parseIdentifier, { IdentifierDetails } from './parseIdentifier';

/**
 * The information derived from a `FunctionDeclaration` object.
 */
export type FunctionDeclarationDetails = Pick<JSDocDetails, 'description' | 'deprecated'> & {
    export: ExportType,
    name: IdentifierDetails['text'],
    type: string,
    kind: 'NamedFunction' | 'Unknown',
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
    let exportType: FunctionDeclarationDetails['export'] = false;
    let description: FunctionDeclarationDetails['description'] = '';
    let deprecated: FunctionDeclarationDetails['deprecated'] = false;

    // Function name
    if (functionName && ts.isIdentifier(functionName)) {
        const details = parseIdentifier(functionName);

        name = details.text;
    }

    // Export type
    if (modifiers) {
        console.log(modifiers[1]);
        exportType = getExportType(modifiers);
    }

    // JSDoc details
    if (jsDocNodeArray && jsDocNodeArray[0]) {
        const details = parseJSDoc(jsDocNodeArray[0]);

        description = details.description;
        deprecated = details.deprecated;
    }

    return {
        name,
        description,
        deprecated,
        export: exportType,
        kind: 'NamedFunction',
        type: '',
    };
}