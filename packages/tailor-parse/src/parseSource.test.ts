import ts from 'typescript';
import { expect, test, describe } from 'vitest';

import parseSource from './parseSource';

describe('parseSource', () => {
    test('parse raw source content', async () => {
        let variableStatement: ts.Node | undefined;

        parseSource({
            text: `var foo: 'bar';`,
            walk: {
                VariableStatement(node) {
                    variableStatement = node;
                },
            },
        });

        expect(ts.isVariableStatement(variableStatement)).toBe(true)

        // parseSource
        // const returnTag: Partial<ts.Source> = {
        //     comment: 
        //     typeExpression: 
        // };

        // const result = parse(`
        //     /** Description ... */
        //     function description() {
        //         return true;
        //     }
        //     /* No description */
        //     function noDescription() {
        //         return true;
        //     }
        // `);
        // const description: Partial<VariableStatementDetails> = {
        //     name: 'description',
        //     description: 'Description ...',
        // };
        // const noDescription: Partial<VariableStatementDetails> = {
        //     name: 'noDescription',
        //     description: '',
        // };

        // expect(result).toHaveLength(2);
        // expect(result[0]).toStrictEqual(expect.objectContaining(description));
        // expect(result[1]).toStrictEqual(expect.objectContaining(noDescription));
    });
});
