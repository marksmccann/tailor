import ts from 'typescript';

// import parseJSDoc, { JSDocDetails } from './parseJSDoc';
import parseModifierArray from './parseModifierArray';
// import parseVariableDeclaration, { VariableDeclarationDetails } from './parseVariableDeclaration';

/**
 * The information derived from a `VariableStatement` object.
 */
export type VariableStatementDetails =
    // Omit<JSDocDetails, ''> &
    // VariableDeclarationDetails &
    { export: ReturnType<typeof parseModifierArray>['exportType'] };

/**
 * Parse a `VariableStatement` object to derive relevant details from it.
 * @param node The `VariableStatement` object to parse
 * @returns The derived details
 */
export default function parseVariableStatement(node: ts.VariableStatement): VariableStatementDetails {
    const { declarationList, modifiers } = node;
    // const [firstDeclaration] = declarationList.declarations;
    // @ts-expect-error - "jsDoc" key is missing from type
    // const jsDocNodeArray = node.jsDoc as ts.NodeArray<ts.JSDoc> | undefined;
    // const isConstant = declarationList.flags === 2;

    // Details to collect
    // let name: VariableStatementDetails['name'] = { text: '' };
    // let description: VariableStatementDetails['description'] = '';
    // let deprecated: VariableStatementDetails['deprecated'] = false;
    let exportType: VariableStatementDetails['export'] = 'none';
    // let type: VariableStatementDetails['type'] = { text: '' };
    // let kind: VariableStatementDetails['kind'] = 'Unknown';

    // JSDoc details
    // if (jsDocNodeArray && jsDocNodeArray[0]) {
    //     const details = parseJSDoc(jsDocNodeArray[0]);

    //     description = details.description;
    //     deprecated = details.deprecated;
    // }

    // Export type
    if (modifiers) {
        //     exportType = getExportType(modifiers);
        // }

        // Primary variable declaration
        // if (firstDeclaration) {
        //     const details = parseVariableDeclaration(firstDeclaration, { constant: isConstant });

        //     name = details.name;
        //     type = details.type;
        //     kind = details.kind;
        // }

        return {
            // name,
            // description,
            // deprecated,
            export: exportType,
            // kind,
            // type,
        };
    }
}