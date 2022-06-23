import { BaseParameterObject, DiscriminatorObject, ExternalDocumentationObject, ISpecificationExtension, ReferenceObject, SchemaObject as schema, XmlObject } from "openapi3-ts";
import { FormKitSchemaComponent, FormKitSchemaDOMNode, FormKitSchemaFormKit, FormKitSchemaProps } from "@formkit/core"

export interface Options {
    step: number,
    transformers: Transformer[]
}

export type Transformer = (param: Parameter, options: Options, item: FormKitItem) => void


type TempOmitSchema = Omit<schema, 'exclusiveMinimum'|'exclusiveMaximum'>;

export interface SchemaObject extends ISpecificationExtension {
    nullable?: boolean;
    discriminator?: DiscriminatorObject;
    readOnly?: boolean;
    writeOnly?: boolean;
    xml?: XmlObject;
    externalDocs?: ExternalDocumentationObject;
    example?: any;
    examples?: any[];
    deprecated?: boolean;
    type?: 'integer' | 'number' | 'string' | 'boolean' | 'object' | 'null' | 'array';
    format?: 'int32' | 'int64' | 'float' | 'double' | 'byte' | 'binary' | 'date' | 'date-time' | 'password' | string;
    allOf?: (SchemaObject | ReferenceObject)[];
    oneOf?: (SchemaObject | ReferenceObject)[];
    anyOf?: (SchemaObject | ReferenceObject)[];
    not?: SchemaObject | ReferenceObject;
    items?: SchemaObject | ReferenceObject;
    properties?: {
        [propertyName: string]: SchemaObject | ReferenceObject;
    };
    additionalProperties?: SchemaObject | ReferenceObject | boolean;
    description?: string;
    default?: any;
    title?: string;
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: number;
    minimum?: number;
    exclusiveMinimum?: number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    maxProperties?: number;
    minProperties?: number;
    required?: string[];
    enum?: any[];
}

export interface Parameter extends Omit<BaseParameterObject, 'schema'> {
    name: string
    schema: SchemaObject
}

export type FormKitItem = (FormKitInput | FormKitGroup | FormKitSchemaDOMNode | FormKitSchemaFormKit) & Record<string, any>

export interface FormKitInput extends FormKitSchemaComponent {
    $cmp: 'FormKit',
    props: InputProps,
    children?: Array<FormKitItem>
}

export interface FormKitGroup extends FormKitSchemaFormKit {
    $formkit: 'group',
    name: String,
    children: Array<FormKitItem>
    props: UniversalProps
}

export interface InputProps extends UniversalProps {
    name: String
    type: String
    placeholder?: String
    help?: String
    min?: Number
    max?: Number
    step?: Number
}


export interface UniversalProps {
    config?: Object
    delay?: Number
    errors?: Array<String>
    id?: String
    ignore?: String
    parent?: any,
    preserve?: Boolean
    sectionsSchema?: Object
    validation?: Array<Array<any>>
    validationVisibility?: 'blur' | 'dirty' | 'live'
    validationLabel?: string,
    validationRules?: Object
    value?: any
}

export interface Route {
    $cmp: "FormKit"
    props: {
        type: "form",
        method: method
    }
    children: FormKitItem[]
}

export type method = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options' | 'trace';


//FIXME: Is there a better way ?
declare module '@formkit/core' {
    export interface Event {

    }
}
