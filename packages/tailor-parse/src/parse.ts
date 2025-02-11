
/* eslint-disable */

import ts from "typescript";

// import parseJSDoc from "./parseJSDoc";
// import getExportType from "./getExportType";
import { Entity } from "./types";
import parseVariableStatement from "./parseVariableStatement";

export default function parse(sourceText: string) {
    const entities: any[] = [];
    const sourceFile = ts.createSourceFile(
        '',
        sourceText,
        ts.ScriptTarget.ES2015,
        true
    );

    ts.forEachChild(sourceFile, (node) => {
        // let name: Entity["name"] = "";
        // let type: Entity["type"] = "";
        // let kind: Entity["kind"] | undefined;
        // let exportType: Entity["export"] = false;
        // let entity: Entity | undefined;
        // let jsDoc: ReturnType<typeof getJSDocDetails> = {
        //     description: "",
        //     deprecated: false,
        //     returns: undefined,
        //     parameters: [],
        //     properties: [],
        // };

        let name: string = '';
        let description: Entity['description'] = '';
        let deprecated: Entity['deprecated'] = false;
        let exportType: Entity['export'] = false;
        let type: any = '';
        let kind: any = '';

        // if (ts.isFunctionDeclaration(node)) {
        //     const functionDeclaration = node as ts.FunctionDeclaration & {
        //         jsDoc?: ts.JSDoc[];
        //     };
        //     const {
        //         name: identifier,
        //         jsDoc: jsDocNodeList,
        //         modifiers,
        //     } = functionDeclaration;

        //     kind = "Function";

        //     if (jsDocNodeList?.[0]) {
        //         jsDoc = getJSDocDetails(jsDocNodeList[0]);
        //     }

        //     if (modifiers) {
        //         exportType = getExportType(modifiers);
        //     }

        //     if (identifier?.kind === ts.SyntaxKind.Identifier) {
        //         const { escapedText } = identifier;

        //         if (typeof escapedText === "string") {
        //             name = escapedText;
        //         } else {
        //             console.error("Function declaration is missing name");
        //         }
        //     }
        if (ts.isVariableStatement(node)) {
            const result = parseVariableStatement(node);

            description = result.description;
            deprecated = result.deprecated;
            exportType = result.export;
            name = result.name;
            kind = result.kind;
            type = result.type;
            // const variableStatement = node as ts.VariableStatement & {
            //     jsDoc?: ts.JSDoc[];
            // };
            // const {
            //     declarationList,
            //     jsDoc: jsDocNodeList,
            //     modifiers,
            // } = variableStatement;
            // const [firstDeclaration] = declarationList.declarations;

            // if (jsDocNodeList?.[0]) {
            //     jsDoc = getJSDocDetails(jsDocNodeList[0]);
            // }

            // if (modifiers) {
            //     exportType = getExportType(modifiers);
            // }

            // if (firstDeclaration) {
            //     if (ts.isIdentifier(firstDeclaration?.name)) {
            //         const { escapedText } = firstDeclaration.name;

            //         if (typeof escapedText === "string") {
            //             name = escapedText;
            //         }
            //     }

            //     if (firstDeclaration.initializer) {
            //         if (ts.isStringLiteral(firstDeclaration?.initializer)) {
            //             const { text } = firstDeclaration.initializer;
            //             kind = "Literal";
            //             type = text;
            //         } else if (firstDeclaration.initializer !== undefined) {
            //             console.error(
            //                 "Unknown variable statement initializer",
            //             );
            //         }
            //     }
            // }
        }

        if (node.kind === ts.SyntaxKind.EndOfFileToken) {
            return;
        }

        entities.push({
            name,
            description,
            deprecated,
            export: exportType,
            type,
            kind,
        });

        // if (kind === "Function") {
        //     const functionType: FunctionType = {
        //         name,
        //         type,
        //         kind,
        //         export: exportType,
        //         description: jsDoc.description,
        //         deprecated: jsDoc.deprecated,
        //         parameters: jsDoc.parameters,
        //         returns: jsDoc.returns,
        //     };

        //     entity = functionType;
        // } else if (kind === "Literal") {
        //     const literalType: LiteralType = {
        //         name,
        //         type,
        //         kind,
        //         export: exportType,
        //         description: jsDoc.description,
        //         deprecated: jsDoc.deprecated,
        //     };

        //     entity = literalType;
        // }

        // if (entity) {
        //     entities.push({
        //         description,
        //         deprecated,
        //         export: exportType,
        //     });
        // } else {
        //     console.error(`Unknown entity for node of type "${node.kind}"`);
        // }
    });

    return entities;
}