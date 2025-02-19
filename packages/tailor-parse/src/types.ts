/**
 * The details related to the return statement found within a function artifact.
 * @since 0.1.0
 */
export interface ReturnType {
    /**
     * The string representation of the type.
     * @since 0.1.0
     */
    type: string;

    /**
     * The associated description for the statement.
     * @since 0.1.0
     */
    description: string;
}

/**
 * The details related to a parameter found within a function artifact.
 * @since 0.1.0
 */
export interface Parameter {
    /**
     * The name of the parameter.
     * @since 0.1.0
     */
    name: string;

    /**
     * Whether the parameter is optional or not.
     * @since 0.1.0
     */
    optional: boolean;

    /**
     * The string representation of the type.
     * @since 0.1.0
     */
    type: string;

    /**
     * The associated description for the parameter.
     * @since 0.1.0
     */
    description: string;
}

/**
 * The details related to a property found within an object artifact.
 * @since 0.1.0
 */
export interface Property {
    /**
     * The name of the property.
     * @since 0.1.0
     */
    name: string;

    /**
     * Whether the property is optional or not.
     * @since 0.1.0
     */
    optional: boolean;

    /**
     * The string representation of the type.
     * @since 0.1.0
     */
    type: string;

    /**
     * The associated description for the property.
     * @since 0.1.0
     */
    description: string;
}

/**
 * The base structure for all artifacts.
 * @since 0.1.0
 */
export interface ArtifactBase {
    /**
     * The kind of artifact.
     * @since 0.1.0
     */
    kind: string;

    /**
     * The string representation of the type.
     * @since 0.1.0
     */
    type: string;


    /**
     * The name associated with the artfact if any.
     * @since 0.1.0
     */
    name: string;

    /**
     * The associated description for the artifact.
     * @since 0.1.0
     */
    description: string;

    /**
     * The deprecated status or description.
     * @since 0.1.0
     */
    deprecated: boolean | string,

    /**
     * The type of export assocaited with the artifact.
     * @since 0.1.0
     */
    export: 'default' | 'named' | 'none';
}

/**
 * An artifact that represents an unknown entity. This type of artifact 
 * occurs when the parser does not recognize the entity due to irregular
 * syntax or lack of explicit support for it.
 * @since 0.1.0
 */
export interface UnknownArtifact {
    kind: 'Unknown';
}

/**
 * An artifact that represents a simple type such as native
 * primitives, template literals, regular expressions, etc.
 * @since 0.1.0
 */
export interface SimpleArtifact extends ArtifactBase {
    kind: 'Simple';
}

/**
 * An artifact that represents a function.
 * @since 0.1.0
 */
export interface FunctionArtifact extends ArtifactBase {
    kind: 'Function';
    parameters?: Array<Parameter>;
    returns?: ReturnType;
}

/**
 * An artifact that represents an object with properties.
 * @since 0.1.0
 */
export interface ObjectArtifact extends ArtifactBase {
    kind: 'Object';
    properties: Array<Property>;
}

/**
 * An artifact that represents a JavaScript class with
 * properties, methods and more.
 * @since 0.1.0
 */
export interface ClassArtifact extends ArtifactBase {
    kind: 'Class';
    constructor?: FunctionArtifact;
    properties: Array<Property>;
    methods: Array<FunctionArtifact>;
}

/**
 * An artifact that represents any consumable entity found within
 * the source code and contains all relevant details related to it.
 * @since 0.1.0
 */
export type Artifact = SimpleArtifact | FunctionArtifact | ObjectArtifact | ClassArtifact | UnknownArtifact;