// https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API

import { readFileSync } from "fs";
import parse from "./parse";

const testFiles = [
    "./test/FunctionDeclaration.mock.js",
    "./test/FunctionDeclaration.mock.ts",
    "./test/VariableStatement.mock.ts",
];

try {
    testFiles.forEach((file) => {
        const entities = parse(readFileSync(file).toString());

        console.log(entities);
    });
} catch (error) {
    console.error("Failed ...", error);
}
