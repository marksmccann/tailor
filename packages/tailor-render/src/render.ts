import { parse } from 'path';
import { readFile } from 'fs/promises';

export default async function render(file: string): Promise<void> {
    const { ext } = parse(file);
    const sourceText = await readFile(file, 'utf8');

    console.log(sourceText, ext);
}