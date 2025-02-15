import ts from 'typescript';
import { expect, test, describe } from 'vitest';

import parseJSDocReturnTag, { JSDocReturnTagDetails } from './parseJSDocReturnTag';
import parseSource from './parseSource';

describe('parseJSDocReturnTag', () => {
    test('description', () => {
        // parseSource
        // const returnTag: Partial<ts.JSDocReturnTag> = {
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
