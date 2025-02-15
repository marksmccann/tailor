import ts from "typescript";

import { JSDocDeprecatedTagDetails, JSDocPropertyLikeTagDetails, JSDocReturnTagDetails } from "./jsdoc-tags";
import parseIdentifier from "./parseIdentifier";

/**
 * The comprehensive list of detail objects that can be derived from a JSDoc comment block.
 */
export type JSDocTagDetails = JSDocDeprecatedTagDetails | JSDocPropertyLikeTagDetails | JSDocReturnTagDetails;

/**
 * Parse an individual `JSDocTag` object to derive relevant details from it.
 * @param node The `JSDocTag` node to parse
 * @returns The derived details
 */
export default function parseJSDocTag(node: ts.JSDocTag): JSDocTagDetails {
    const { tagName, comment } = node;
    const name = parseIdentifier(tagName);
    let details: JSDocTagDetails;

    // if (ts.isJSDocDeprecatedTag(node)) {
    //     let description = '';

    //     if (typeof comment === "string") {
    //         description = comment;
    //     } else if (comment !== undefined) {
    //         console.error("Unknown comment type for `JSDocDeprecatedTag` node");
    //     }

    //     details = {
    //         tag: '@deprecated',
    //         description,
    //     };
    // } else if (node.kind === ts.SyntaxKind.JSDocComment) {
    // } else if (ts.isJSDocReturnTag(tag)) {
    //     const returnsType = '';
    //     let returnsDescription = '';

    //     if (typeof comment === "string") {
    //         returnsDescription = comment;
    //     } else if (comment !== undefined) {
    //         console.error("Unknown comment type for `JSDocReturnTag` node");
    //     }

    //     if (tag.typeExpression) {
    //         const details = parseTypeNode(tag.typeExpression.type);
    //         returnsType.text = details.type;
    //     }

    //     details = {
    //         tag: '@returns',
    //         description: returnsDescription,
    //         type: returnsType,
    //     };
    // }
    // else if (ts.isJSDocParameterTag(tag) || ts.isJSDocPropertyTag(tag)) {
    //     let propertyType = { text: '' };
    //     let propertyName = "";
    //     let propertyDescription = "";
    //     const propertyOptional = tag.isBracketed;

    //     if (typeof tag.comment === "string") {
    //         propertyDescription = tag.comment;
    //     } else if (typeof tag.comment !== "undefined") {
    //         console.error("Unknown JSDocDetails property-like tag comment type");
    //     }

    //     if (tag.name.kind === ts.SyntaxKind.Identifier) {
    //         if (typeof tag?.name.escapedText === "string") {
    //             propertyName = tag.name.escapedText;
    //         }
    //     }

    //     if (tag.typeExpression) {
    //         propertyType = parseTypeNode(tag.typeExpression.type);
    //     }

    //     const property: JSDocPropertyLikeTagDetails = {
    //         type: propertyType,
    //         name: propertyName,
    //         description: propertyDescription,
    //         optional: propertyOptional,
    //     };

    //     if (ts.isJSDocPropertyTag(tag)) {
    //         properties.push(property);
    //     } else {
    //         parameters.push(property);
    //     }
    // }

    return details;
}