import { expect, test, describe } from 'vitest';

import parse from '../src/parse';
import { VariableStatementDetails } from '../src/parseVariableStatement';

test('literals', () => {
    const nodes = parse(`
        let stringLiteral = 'Hello World!';
        var trueLiteral = true;
        let falseLiteral = false;
        var numericLiteral = 0;
    `);
    const stringLiteral: Partial<VariableStatementDetails> = {
        name: 'stringLiteral',
        kind: 'Literal',
        type: 'string',
    };
    const trueLiteral: Partial<VariableStatementDetails> = {
        name: 'trueLiteral',
        kind: 'Literal',
        type: 'boolean',
    };
    const falseLiteral: Partial<VariableStatementDetails> = {
        name: 'falseLiteral',
        kind: 'Literal',
        type: 'boolean',
    };
    const numericLiteral: Partial<VariableStatementDetails> = {
        name: 'numericLiteral',
        kind: 'Literal',
        type: 'number',
    };

    expect(nodes).toHaveLength(4);
    expect(nodes[0]).toStrictEqual(expect.objectContaining(stringLiteral));
    expect(nodes[1]).toStrictEqual(expect.objectContaining(trueLiteral));
    expect(nodes[2]).toStrictEqual(expect.objectContaining(falseLiteral));
    expect(nodes[3]).toStrictEqual(expect.objectContaining(numericLiteral));
});

test('constants', () => {
    const result = parse(`
        const stringConstant = 'Hello World!';
        const trueConstant = true;
        const falseConstant = false;
        const numericConstant = 0;
    `);
    const stringConstant: Partial<VariableStatementDetails> = {
        name: 'stringConstant',
        kind: 'Literal',
        type: "'Hello World!'",
    };
    const trueConstant: Partial<VariableStatementDetails> = {
        name: 'trueConstant',
        kind: 'Literal',
        type: "true",
    };
    const falseConstant: Partial<VariableStatementDetails> = {
        name: 'falseConstant',
        kind: 'Literal',
        type: 'false',
    };
    const numericConstant: Partial<VariableStatementDetails> = {
        name: 'numericConstant',
        kind: 'Literal',
        type: '0',
    };

    expect(result).toHaveLength(4);
    expect(result[0]).toStrictEqual(expect.objectContaining(stringConstant));
    expect(result[1]).toStrictEqual(expect.objectContaining(trueConstant));
    expect(result[2]).toStrictEqual(expect.objectContaining(falseConstant));
    expect(result[3]).toStrictEqual(expect.objectContaining(numericConstant));
});

describe('JSDoc', () => {
    test('description', () => {
        const result = parse(`
            /** Description ... */
            let description = '';
            /* No description */
            const noDescription = '';
        `);
        const description: Partial<VariableStatementDetails> = {
            name: 'description',
            description: 'Description ...',
        };
        const noDescription: Partial<VariableStatementDetails> = {
            name: 'noDescription',
            description: '',
        };

        expect(result).toHaveLength(2);
        expect(result[0]).toStrictEqual(expect.objectContaining(description));
        expect(result[1]).toStrictEqual(expect.objectContaining(noDescription));
    });

    test('@deprecated', () => {
        const result = parse(`
            /** @deprecated */
            let deprecatedTag = '';
            /** @deprecated Description ... */
            const deprecatedTagWithDescription = '';
            /** Not deprecated */
            var notDeprecated = '';
        `);
        const deprecatedTag: Partial<VariableStatementDetails> = {
            name: 'deprecatedTag',
            deprecated: true,
        };
        const deprecatedTagWithDescription: Partial<VariableStatementDetails> = {
            name: 'deprecatedTagWithDescription',
            deprecated: 'Description ...',
        };
        const notDeprecated: Partial<VariableStatementDetails> = {
            name: 'notDeprecated',
            deprecated: false,
        };

        expect(result).toHaveLength(3);
        expect(result[0]).toStrictEqual(expect.objectContaining(deprecatedTag));
        expect(result[1]).toStrictEqual(expect.objectContaining(deprecatedTagWithDescription));
        expect(result[2]).toStrictEqual(expect.objectContaining(notDeprecated));
    });
});

// est('export modifier', () => {
//     const result = parse(`
//         export let myVariable = 'Hello World!';
//     `);
//     const expected: VariableStatementDetails = {
//         name: 'myVariable',
//         kind: 'Literal',
//         type: "string",
//         description: '',
//         deprecated: false,
//         export: 'named',
//     };

//     expect(result).toHaveLength(1);
//     expect(result[0]).toStrictEqual(expect.objectContaining(expected));
// });

// est('default export modifier', () => {
//     const result = parse(`
//         export default let myVariable = 'Hello World!';
//     `);
//     const expected: VariableStatementDetails = {
//         name: 'myVariable',
//         kind: 'Literal',
//         type: "string",
//         description: '',
//         deprecated: false,
//         export: 'default',
//     };

//     expect(result).toHaveLength(1);
//     expect(result[0]).toStrictEqual(expect.objectContaining(expected));
// });

// est('basic string variable with type annotation', () => {
//     const result = parse(`
//         let myVariable: string | boolean = 'Hello World!';
//     `);

//     expect(result).toHaveLength(1);
//     expect(result[0]).toStrictEqual(expect.objectContaining({
//         name: 'myVariable',
//         kind: 'Literal',
//         type: 'string',
//         description: '',
//         deprecated: false,
//         export: false,
//     }));
// });

