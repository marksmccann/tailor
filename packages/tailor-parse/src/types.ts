/**
 * Details for a JSDoc property-like tag (e.g. &#64;property, &#64;argument, &#64;param).
 */
export interface JSDocDetailsPropertyLikeTag {
    name: string;
    optional: boolean;
    type: string;
    description: string;
}

/**
 * Details for a JSDoc &#64;return tag.
 */
export interface JSDocDetailsReturnTag {
    type: string;
    description: string;
}

/**
 * Details applicable to any JSDoc comment block.
 */
export interface JSDocDetailsBase {
    description: string;
    deprecated: boolean | string;
}

/**
 * The comprehensive list of details derived from a JSDoc comment block.
 */
export interface JSDocDetails extends JSDocDetailsBase {
    parameters: JSDocDetailsPropertyLikeTag[];
    properties: JSDocDetailsPropertyLikeTag[];
    returns: JSDocDetailsReturnTag | undefined;
}

/**
 * The names of the supported entity types.
 */
export type EntityKind = "Function" | "Class" | "Literal";

/**
 * The type of export an entity is. "false" if not exported.
 */
export type ExportType = "default" | "named" | false

/**
 * The generic details for an entity found in the source file.
 */
export interface EntityBase<Kind extends EntityKind> {
    readonly name: string;
    readonly kind: Kind;
    readonly type: string;
    readonly export: ExportType;
}

/**
 * The details for a function found within the source file.
 */
export type FunctionType = EntityBase<"Function"> &
    JSDocDetailsBase &
    Pick<JSDocDetails, "parameters" | "returns">;

/**
 * The details for a literal type (e.g. string, numeric) found within the source file.
 */
export type LiteralType = EntityBase<"Literal"> & JSDocDetailsBase;

/**
 * A union of all supported entity types.
 */
export type Entity = FunctionType | LiteralType;
