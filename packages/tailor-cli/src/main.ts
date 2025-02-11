import { Command } from 'commander';
import { glob } from 'glob';
import { render } from 'tailor-render';

try {
    const tailorCLI = new Command();

    tailorCLI.name('tailor-cli')
    tailorCLI.description('Command-line interface for `Tailor`')
    tailorCLI.version('0.0.0');
    tailorCLI.argument('<files>', 'The target files to process');
    tailorCLI.parse(process.argv);

    const files = tailorCLI.processedArgs[0] as string;
    const filePaths = await glob(files);

    await Promise.all(filePaths.map(async (file) => await render(file)));
} catch (error) {
    console.error('Failed ...', error);
}

// import { readFileSync } from "fs";
// import parse from "tailor-parse";
// import render from "tailor-render";

// const testFiles = [
//     "./test/FunctionDeclaration.mock.js",
//     "./test/FunctionDeclaration.mock.ts",
//     "./test/VariableStatement.mock.ts",
// ];

// try {
//     testFiles.forEach((file) => {
//         const entities = parse(readFileSync(file).toString());

//         console.log(entities);
//     });
// } catch (error) {
//     console.error("Failed ...", error);
// }
