import ts from "typescript";

import getTypeExpression from "./getTypeExpression";

/**
 * Details for a `JSDoc` property-like tag (e.g. &#64;property, &#64;argument, &#64;param).
 */
export interface JSDocPropertyLikeTagDetails {
    name: string;
    optional: boolean;
    type: string;
    description: string;
}

/**
 * Details for a `JSDoc` &#64;return tag.
 */
export interface JSDocReturnTagDetails {
    type: string;
    description: string;
}

/**
 * The comprehensive list of details derived from a `JSDoc` comment block.
 */
export interface JSDocDetails {
    description: string;
    deprecated: boolean | string;
    parameters: JSDocPropertyLikeTagDetails[];
    properties: JSDocPropertyLikeTagDetails[];
    returns: JSDocReturnTagDetails | undefined;
}

/**
 * Parse a `JSDoc` object to derive relevant details from it.
 * @param node The `JSDoc` node to parse
 * @returns The derived details
 */
export default function parseJSDoc(node: ts.JSDoc): JSDocDetails {
    const parameters: JSDocDetails["parameters"] = [];
    const properties: JSDocDetails["properties"] = [];
    let deprecated: JSDocDetails["deprecated"] = false;
    let description: JSDocDetails["description"] = "";
    let returns: JSDocDetails["returns"];

    if (typeof node.comment === "string") {
        description = node.comment;
    } else if (node.comment !== undefined) {
        console.error("Unknown JSDocDetails node comment type");
    }

    node.tags?.forEach((tag) => {
        if (ts.isJSDocDeprecatedTag(tag)) {
            if (typeof tag.comment === "string") {
                deprecated = tag.comment || true;
            } else if (tag.comment === undefined) {
                deprecated = true;
            } else {
                console.error("Unknown JSDocDetails deprecated tag comment type");
            }
        } else if (ts.isJSDocReturnTag(tag)) {
            let returnsDescription = "";
            let returnsType = "";

            if (typeof tag.comment === "string") {
                returnsDescription = tag.comment;
            } else if (tag.comment !== undefined) {
                console.error("Unknown JSDocDetails return tag comment type");
            }

            if (tag.typeExpression) {
                returnsType = getTypeExpression(tag.typeExpression.type);
            }

            returns = {
                description: returnsDescription,
                type: returnsType,
            };
        } else if (ts.isJSDocParameterTag(tag) || ts.isJSDocPropertyTag(tag)) {
            let propertyType = "";
            let propertyName = "";
            let propertyDescription = "";
            const propertyOptional = tag.isBracketed;

            if (typeof tag.comment === "string") {
                propertyDescription = tag.comment;
            } else if (typeof tag.comment !== "undefined") {
                console.error("Unknown JSDocDetails property-like tag comment type");
            }

            if (tag.name.kind === ts.SyntaxKind.Identifier) {
                if (typeof tag?.name.escapedText === "string") {
                    propertyName = tag.name.escapedText;
                }
            }

            if (tag.typeExpression) {
                propertyType = getTypeExpression(tag.typeExpression.type);
            }

            const property: JSDocPropertyLikeTagDetails = {
                type: propertyType,
                name: propertyName,
                description: propertyDescription,
                optional: propertyOptional,
            };

            if (ts.isJSDocPropertyTag(tag)) {
                properties.push(property);
            } else {
                parameters.push(property);
            }
        }
    });

    return {
        description,
        deprecated,
        returns,
        parameters,
        properties,
    };
}
