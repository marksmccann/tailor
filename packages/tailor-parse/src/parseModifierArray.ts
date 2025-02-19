import ts from 'typescript';

/**
 * The information derived from a `NodeArray<ModifierLike>` object.
 */
export interface ModifierArrayDetails {
    /**
     * The type of export assocated with the node.
     */
    exportType: 'none' | 'default' | 'named',
}

/**
 * Parses a `NodeArray<ModifierLike>` node to derive details from it.
 * @param modifiers The array of `ModifierLike` nodes to parse
 * @returns The derived details
 */
export default function parseModifierArray(modifiers: ts.NodeArray<ts.ModifierLike>): ModifierArrayDetails {
    let exportKeyword = false;
    let defaultKeyword = false;
    let exportType: ModifierArrayDetails['exportType'] = 'none';

    modifiers.forEach((modifier) => {
        const { kind } = modifier;

        if (kind === ts.SyntaxKind.ExportKeyword) {
            exportKeyword = true;
        } else if (kind === ts.SyntaxKind.DefaultKeyword) {
            defaultKeyword = true;
        }
    });

    if (exportKeyword && defaultKeyword) {
        exportType = 'default';
    } else if (exportKeyword) {
        exportType = 'named';
    }

    return { exportType };
}