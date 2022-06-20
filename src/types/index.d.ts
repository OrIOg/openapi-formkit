import { BaseParameterObject, SchemaObject as schema } from "openapi3-ts";
import { FormKitSchemaComponent, FormKitSchemaDOMNode, FormKitSchemaFormKit } from "@formkit/core"

export interface Options {
    step: number,
    inputsWrapper?: FormKitSchemaDOMNode
}


export interface SchemaObject extends Omit<schema, 'exclusiveMinimum'|'exclusiveMaximum'> & schema  {
    exclusiveMinimum: number
    exclusiveMaximum: number
}

export interface Parameter extends Omit<BaseParameterObject, 'schema'> {
    name: string
    schema: SchemaObject
}

export type FormKitItem = FormKitInput | FormKitGroup | FormKitSchemaDOMNode | FormKitSchemaFormKit

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
