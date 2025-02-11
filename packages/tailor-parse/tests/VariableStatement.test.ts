import { expect, test, describe } from 'vitest';

import parse from '../src/parse';
import { VariableStatementDetails } from '../src/parseVariableStatement';

describe('VariableStatement', () => {
    test('literals', () => {
        const nodes = parse(`
            let stringLiteral = 'Hello World!';
            var trueLiteral = true;
            let falseLiteral = false;
            var numericLiteral = 0;
            let nullLiteral = null;
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
        const nullLiteral: Partial<VariableStatementDetails> = {
            name: 'nullLiteral',
            kind: 'Literal',
            type: 'null',
        };

        expect(nodes).toHaveLength(4);
        expect(nodes[0]).toStrictEqual(expect.objectContaining(stringLiteral));
        expect(nodes[1]).toStrictEqual(expect.objectContaining(trueLiteral));
        expect(nodes[2]).toStrictEqual(expect.objectContaining(falseLiteral));
        expect(nodes[3]).toStrictEqual(expect.objectContaining(numericLiteral));
        expect(nodes[3]).toStrictEqual(expect.objectContaining(nullLiteral));
    });

    test('constants', () => {
        const result = parse(`
            const stringConstant = 'Hello World!';
            const trueConstant = true;
            const falseConstant = false;
            const numericConstant = 0;
            const nullConstant = null;
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
        const nullConstant: Partial<VariableStatementDetails> = {
            name: 'nullConstant',
            kind: 'Literal',
            type: 'null',
        };

        expect(result).toHaveLength(4);
        expect(result[0]).toStrictEqual(expect.objectContaining(stringConstant));
        expect(result[1]).toStrictEqual(expect.objectContaining(trueConstant));
        expect(result[2]).toStrictEqual(expect.objectContaining(falseConstant));
        expect(result[3]).toStrictEqual(expect.objectContaining(numericConstant));
        expect(result[3]).toStrictEqual(expect.objectContaining(nullConstant));
    });

    test.only('annotated literals', () => {
        const result = parse(`
            let stringLiteral: 'Hello World!' = 'Hello World!';
            const stringConstant: string = 'Hello World!';
            let numberLiteral: 0 = 0;
            const numberConstant: number = 0;
            let booleanLiteral: false = false;
            const booleanConstant: boolean = true;
        `);
        const stringLiteral: Partial<VariableStatementDetails> = {
            name: 'stringLiteral',
            kind: 'Literal',
            type: "'Hello World!'",
        };
        const stringConstant: Partial<VariableStatementDetails> = {
            name: 'stringConstant',
            kind: 'Literal',
            type: 'string',
        };
        const numberLiteral: Partial<VariableStatementDetails> = {
            name: 'numberLiteral',
            kind: 'Literal',
            type: "0",
        };
        const numberConstant: Partial<VariableStatementDetails> = {
            name: 'numberConstant',
            kind: 'Literal',
            type: 'number',
        };
        const booleanLiteral: Partial<VariableStatementDetails> = {
            name: 'booleanLiteral',
            kind: 'Literal',
            type: "false",
        };
        const booleanConstant: Partial<VariableStatementDetails> = {
            name: 'booleanConstant',
            kind: 'Literal',
            type: 'boolean',
        };

        expect(result).toHaveLength(6);
        expect(result[0]).toStrictEqual(expect.objectContaining(stringLiteral));
        expect(result[1]).toStrictEqual(expect.objectContaining(stringConstant));
        expect(result[2]).toStrictEqual(expect.objectContaining(numberLiteral));
        expect(result[3]).toStrictEqual(expect.objectContaining(numberConstant));
        expect(result[4]).toStrictEqual(expect.objectContaining(booleanLiteral));
        expect(result[5]).toStrictEqual(expect.objectContaining(booleanConstant));
    });

    describe('Modifiers', () => {
        test('named export', () => {
            const result = parse(`
                export let namedVariable = true;
                export const namedConstant = true;
            `);
            const namedVariable: Partial<VariableStatementDetails> = {
                name: 'namedVariable',
                export: 'named',
            };
            const namedConstant: Partial<VariableStatementDetails> = {
                name: 'namedConstant',
                export: 'named',
            };

            expect(result).toHaveLength(2);
            expect(result[0]).toStrictEqual(expect.objectContaining(namedVariable));
            expect(result[1]).toStrictEqual(expect.objectContaining(namedConstant));
        });

        test('no export', () => {
            const result = parse(`
                let namedVariable = true;
                const namedConstant = true;
            `);
            const namedVariable: Partial<VariableStatementDetails> = {
                name: 'namedVariable',
                export: false,
            };
            const namedConstant: Partial<VariableStatementDetails> = {
                name: 'namedConstant',
                export: false,
            };

            expect(result).toHaveLength(2);
            expect(result[0]).toStrictEqual(expect.objectContaining(namedVariable));
            expect(result[1]).toStrictEqual(expect.objectContaining(namedConstant));
        });

        // est('default export', () => {
        //     const result = parse(`
        //         export default let defaultVariable = true;
        //         export default const defaultConstant = true;
        //     `);
        //     const defaultVariable: Partial<VariableStatementDetails> = {
        //         name: 'defaultVariable',
        //         export: 'default',
        //     };
        //     const defaultConstant: Partial<VariableStatementDetails> = {
        //         name: 'defaultConstant',
        //         export: 'default',
        //     };

        //     expect(result).toHaveLength(2);
        //     expect(result[0]).toStrictEqual(expect.objectContaining(defaultVariable));
        //     expect(result[1]).toStrictEqual(expect.objectContaining(defaultConstant));
        // });
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
});
