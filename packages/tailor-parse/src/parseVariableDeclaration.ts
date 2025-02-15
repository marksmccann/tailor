import ts from 'typescript';

import parseTypeNode from './parseTypeNode';
import parseIdentifier, { IdentifierDetails } from './parseIdentifier';
import parseExpression from './parseExpression';

/**
 * The information derived from a `VariableDeclaration` object.
 */
export type VariableDeclarationDetails = {
    name: IdentifierDetails,
    type: ReturnType<typeof parseTypeNode>,
    kind: 'literal' | 'unknown',
};

/**
 * Configuration options for parsing a `VariableDeclaration` object.
 */
export type ParseVariableDeclarationOptions = {
    /**
     * Whether the variable was declared with a `constant` keyword
     */
    constant: boolean
};

/**
 * Parse a `VariableDeclaration` object to derive relevant details from it.
 * @param node The `VariableDeclaration` object to parse
 * @param options The configuration options for parsing
 * @returns The derived details
 */
export default function parseVariableDeclaration(node: ts.VariableDeclaration, options: ParseVariableDeclarationOptions): VariableDeclarationDetails {
    const { name: leftSide, initializer: rightSide, type: typeAnnotation } = node;
    const { constant: isConstant } = options;

    let name: VariableDeclarationDetails['name'] = { text: '' };
    let type: VariableDeclarationDetails['type'] = { type: '' };
    let kind: VariableDeclarationDetails['kind'] = 'unknown';

    if (typeAnnotation) {
        type = parseTypeNode(typeAnnotation);
    }

    if (ts.isIdentifier(leftSide)) {
        name = parseIdentifier(leftSide);
    }

    if (rightSide) {
        const details = parseExpression(rightSide);

        if (details.kind === 'Literal') {
            kind = 'Literal';
        }

        // Infer type from expression if not explicitly annotated
        if (details.kind === 'Literal' && !type.text) {
            if (details.type === 'string') {
                type.text = isConstant ? `'${details.text}'` : 'string';
            } else if (details.type === 'boolean') {
                type.text = isConstant ? details.text : 'boolean';
            } else if (details.type === 'number') {
                type.text = isConstant ? details.text : 'number';
            }
        }
    }

    return { name, type, kind };
}