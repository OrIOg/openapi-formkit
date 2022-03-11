import { BaseParameterObject, SchemaObject } from "openapi3-ts";

export interface Parameter extends BaseParameterObject {
    name: string
    schema: SchemaObject
}

export type FormKitItem = FormKitInput | FormKitGroup

export interface FormKitInput {
    $cmp: 'FormKit',
    props: InputProps
}

export interface FormKitGroup {
    $formkit: 'group',
    name: String,
    children: Array<FormKitItem>
}

export interface InputProps extends UniversalProps {
    placeholder?: String
    help?: String
    min?: Number
    max?: Number
}


export interface UniversalProps {
    name: String
    type: String
    config?: Object
    delay?: Number
    errors?: Array<String>
    id?: String
    ignore?: String
    parent?: any,
    preserve?: Boolean
    sectionsSchema?: Object
    validation?: String | Array<String>
    validationVisibility?: 'blur' | 'dirty' | 'live'
    validationLabel?: string,
    validationRules?: Object
    value?: any
}