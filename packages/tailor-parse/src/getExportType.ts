import ts from 'typescript';

/**
 * The type of export an entity is. Will be "false" if not exported.
 */
export type ExportType = "default" | "named" | false

/**
 * Derive the export type of a node from its list of modifiers.
 * @param modifiers The `ModifierLike` nodes to parse
 * @returns The export type
 */
export default function getExportType(modifiers: ts.NodeArray<ts.ModifierLike>): ExportType {
    let exportKeyword = false;
    let defaultKeyword = false;

    modifiers.forEach((modifier) => {
        if (modifier.kind === ts.SyntaxKind.ExportKeyword) {
            exportKeyword = true;
        } else if (
            modifier.kind === ts.SyntaxKind.DefaultKeyword
        ) {
            defaultKeyword = true;
        }
    });

    if (exportKeyword) {
        return defaultKeyword ? "default" : "named";
    }

    return false;
}