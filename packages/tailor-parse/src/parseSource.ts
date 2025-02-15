import { readFile } from 'fs/promises';
import ts from "typescript";

/**
 * The configuration options for the `parseSource` function
 */
export interface ParseSourceOptions {
    /**
     * The raw text content from the source file to be parsed.
     */
    text?: string,

    /**
     * The file path for the accompanying source text.
     */
    file?: string,

    /**
     * A list of callback functions to call for specific node types.
     */
    walk: {
        FunctionDeclaration?: (node: ts.FunctionDeclaration) => void,
        VariableStatement?: (node: ts.VariableStatement) => void,
    },
}

/**
 * Uses the `typescript` engine to parse the raw source code and 
 * iterate perform an action on each direct child of a given node
 * type within the document.
 * @param options The configuration options for parsing the source
 */
export default async function parseSource(options: ParseSourceOptions) {
    const { file = '', walk } = options;
    let { text = '' } = options;

    if (file && !text) {
        text = await readFile(file, 'utf8');
    } else if (!file && !text) {
        console.error('Failed to parse source. A source file or its text content must be provided');
        return;
    }

    const sourceFile = ts.createSourceFile(
        file,
        text,
        ts.ScriptTarget.ES2015,
        true
    );

    ts.forEachChild(sourceFile, (node) => {
        Object.entries(walk).forEach(([kind, callback]) => {
            if (node.kind === ts.SyntaxKind[kind as keyof typeof walk]) {
                callback.call(node);
            }
        });
    });
}