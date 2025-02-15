/**
 * Copyright (c) Mark McCann
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The details related to any identifier.
 * @since 0.1.0
 */
export interface Identifier {
    text: string;
}

/**
 * The details related to any type annotation.
 */
export interface TypeAnnotation {
    text: string;
}

/**
 * The type of export associated with an artifact. Will be `false` if not exported.
 * @since 0.1.0
 */
export type ExportType = 'default' | 'named' | false;

/**
 * The details related to a description associated with an artifact.
 * @since 0.1.0
 */
export interface Description {
    text: string;
}

/**
 * The details related to the return statement found within a function artifact.
 * @since 0.1.0
 */
export interface ReturnType {
    type: TypeAnnotation;
    description: Description;
}

/**
 * The details related to a parameter found within a function artifact.
 * @since 0.1.0
 */
export interface Parameter {
    name: Identifier;
    optional: boolean;
    type: TypeAnnotation;
    description: Description;
}

/**
 * The details related to a property found within an object artifact.
 * @since 0.1.0
 */
export interface Property {
    name: Identifier;
    optional: boolean;
    type: TypeAnnotation;
    description: Description;
}

/**
 * The deprecated status of an artifact. A string indicates the artifact
 * is deprecated and contains the associated description for it.
 * @since 0.1.0
 */
export type Deprecated = boolean | string;

/**
 * The base structure for all artifacts.
 * @since 0.1.0
 */
export interface ArtifactBase {
    kind: string;
    type: TypeAnnotation;
    name: Identifier;
    description: Description;
    deprecated: Deprecated
    export: ExportType;
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
