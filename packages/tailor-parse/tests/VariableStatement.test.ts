import { expect, test, describe } from 'vitest';

import parse from '../src/parse';
import { SimpleArtifact } from '../src/types';

describe('VariableStatement', () => {
    test('literals', () => {
        const nodes = parse(`
            let stringLiteral = 'Hello World!';
            var trueLiteral = true;
            let falseLiteral = false;
            var numericLiteral = 0;
            let nullLiteral = null;
        `);
        const stringLiteral: Partial<SimpleArtifact> = {
            name: 'stringLiteral',
            kind: 'Simple',
            type: 'string',
        };
        const trueLiteral: Partial<SimpleArtifact> = {
            name: 'trueLiteral',
            kind: 'Simple',
            type: 'boolean',
        };
        const falseLiteral: Partial<SimpleArtifact> = {
            name: 'falseLiteral',
            kind: 'Simple',
            type: 'boolean',
        };
        const numericLiteral: Partial<SimpleArtifact> = {
            name: 'numericLiteral',
            kind: 'Simple',
            type: 'number',
        };
        const nullLiteral: Partial<SimpleArtifact> = {
            name: 'nullLiteral',
            kind: 'Simple',
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
        const stringConstant: Partial<SimpleArtifact> = {
            name: 'stringConstant',
            kind: 'Simple',
            type: "'Hello World!'",
        };
        const trueConstant: Partial<SimpleArtifact> = {
            name: 'trueConstant',
            kind: 'Simple',
            type: "true",
        };
        const falseConstant: Partial<SimpleArtifact> = {
            name: 'falseConstant',
            kind: 'Simple',
            type: 'false',
        };
        const numericConstant: Partial<SimpleArtifact> = {
            name: 'numericConstant',
            kind: 'Simple',
            type: '0',
        };
        const nullConstant: Partial<SimpleArtifact> = {
            name: 'nullConstant',
            kind: 'Simple',
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
        const stringLiteral: Partial<SimpleArtifact> = {
            name: 'stringLiteral',
            kind: 'Simple',
            type: "'Hello World!'",
        };
        const stringConstant: Partial<SimpleArtifact> = {
            name: 'stringConstant',
            kind: 'Simple',
            type: 'string',
        };
        const numberLiteral: Partial<SimpleArtifact> = {
            name: 'numberLiteral',
            kind: 'Simple',
            type: "0",
        };
        const numberConstant: Partial<SimpleArtifact> = {
            name: 'numberConstant',
            kind: 'Simple',
            type: 'number',
        };
        const booleanLiteral: Partial<SimpleArtifact> = {
            name: 'booleanLiteral',
            kind: 'Simple',
            type: "false",
        };
        const booleanConstant: Partial<SimpleArtifact> = {
            name: 'booleanConstant',
            kind: 'Simple',
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
            const namedVariable: Partial<SimpleArtifact> = {
                name: 'namedVariable',
                export: 'named',
            };
            const namedConstant: Partial<SimpleArtifact> = {
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
            const namedVariable: Partial<SimpleArtifact> = {
                name: 'namedVariable',
                export: 'none',
            };
            const namedConstant: Partial<SimpleArtifact> = {
                name: 'namedConstant',
                export: 'none',
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
        //     const defaultVariable: Partial<SimpleArtifact> = {
        //         name: 'defaultVariable',
        //         export: 'default',
        //     };
        //     const defaultConstant: Partial<SimpleArtifact> = {
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
            const description: Partial<SimpleArtifact> = {
                name: 'description',
                description: 'Description ...',
            };
            const noDescription: Partial<SimpleArtifact> = {
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
            const deprecatedTag: Partial<SimpleArtifact> = {
                name: 'deprecatedTag',
                deprecated: true,
            };
            const deprecatedTagWithDescription: Partial<SimpleArtifact> = {
                name: 'deprecatedTagWithDescription',
                deprecated: 'Description ...',
            };
            const notDeprecated: Partial<SimpleArtifact> = {
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
