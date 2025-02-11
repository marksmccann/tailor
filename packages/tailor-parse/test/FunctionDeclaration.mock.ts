export function someBasicTSFunction(): boolean {
    return true;
}

export function someTSFunctionWithParams(
    param1: string,
    param2: string,
): string {
    return param1 || param2;
}

/**
 * @deprecated Dolore labore sunt ea sit anim commodo aliquip deserunt.
 */
export function someDeprecatedTSFunction(): boolean {
    return true;
}

/**
 * Commodo consectetur officia esse consequat aliqua pariatur reprehenderit excepteur.
 * @param param1 Veniam ea commodo id culpa nostrud aute ipsum.
 * @param param2 Laborum duis exercitation exercitation eiusmod.
 * @returns {string} Minim irure laboris ullamco est esse dolore exercitation.
 */
export function someTSFunctionWithDescriptions(
    param1: string,
    param2: string,
): string {
    return param1 || param2;
}

/**
 * @param param1 Veniam ea commodo id culpa nostrud aute ipsum.
 * @param param2 Laborum duis exercitation exercitation eiusmod.
 */
export function someTSFunctionWithOptionalParams(
    param1?: string,
    param2?: string,
): string | undefined {
    return param1 || param2;
}
