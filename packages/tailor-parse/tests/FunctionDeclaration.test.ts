import { expect, test, describe } from 'vitest';

import parse from '../src/parse';
import { FunctionArtifact } from '../src/types';
import { VariableStatementDetails } from '../src/parseVariableStatement';

test('basic function', () => {
    const result = parse(`
        function myFunction() {
            return true;
        }
    `);
    const artifact = result[0] as FunctionArtifact;

    expect(result).toHaveLength(1);
    expect(artifact.kind).toBe('Function');
    expect(artifact.name).toStrictEqual('myFunction');
    expect(artifact.export).toBe('none');
    expect(artifact.parameters).toHaveLength(0);
    // expect(artifact.returns).toStrictEqual(expect.objectContaining({ type: '', description: '' }));
    // expect(artifact.type).toBe('() => boolean');
});

describe('JSDoc', () => {
    test('description', () => {
        const result = parse(`
            /** Description ... */
            function description() {
                return true;
            }
            /* No description */
            function noDescription() {
                return true;
            }
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
            function deprecatedTag() {
                return true;
            }
            /** @deprecated Description ... */
            function deprecatedTagWithDescription() {
                return true;
            };
            /** Not deprecated */
            function notDeprecated() {
                return true;
            };
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

// est('basic typescript function', () => {
// const result = parse(`
//     function myFunction(): boolean {
//         return true;
//     }
// `);

// expect(result).toHaveLength(1);
// expect(result[0].name).toBe('myFunction');
// expect(result[0].kind).toBe('Function');
// expect(result[0].description).toBe('');
// expect(result[0].parameters).toHaveLength(0);
// expect(result[0].deprecated).toBe(false);
// expect(result[0].export).toBe(false);
// expect(result[0].returns).toBe({ type: 'boolean', description: '' });
// expect(result[0].type).toBe('() => boolean');
// });