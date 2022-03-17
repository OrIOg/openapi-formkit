import { BaseParameterObject, SchemaObject } from "openapi3-ts";

export interface Options {
    step: number
}

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