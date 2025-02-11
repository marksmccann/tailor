import { expect, test } from 'vitest';

import parse from '../src/parse';

test('basic typescript function', () => {
    const result = parse(`
        function myFunction(): boolean {
            return true;
        }
    `);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('myFunction');
    expect(result[0].kind).toBe('Function');
    expect(result[0].description).toBe('');
    expect(result[0].parameters).toHaveLength(0);
    expect(result[0].deprecated).toBe(false);
    expect(result[0].export).toBe(false);
    // expect(result[0].returns).toBe({ type: 'boolean', description: '' });
    // expect(result[0].type).toBe('() => boolean');
});

test('basic javascript function', () => {
    const result = parse(`
        function myFunction() {
            return true;
        }
    `);

    expect(result).toHaveLength(1);
    expect(result[0].name).toStrictEqual('myFunction');
    expect(result[0].kind).toBe('Function');
    expect(result[0].description).toBe('');
    expect(result[0].parameters).toHaveLength(0);
    expect(result[0].deprecated).toBe(false);
    expect(result[0].export).toBe(false);
    // expect(result[0].returns).toBe({ type: 'boolean', description: '' });
    // expect(result[0].type).toBe('() => boolean');
});