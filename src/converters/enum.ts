import { FormKitItem, InputProps, Options, Parameter } from "../types";
import { BaseType } from "./base";

export function convertEnum(param: Parameter, options: Options): FormKitItem {
    const schema = param.schema;

    let props = {
        type: 'select',
        name: param.name,
        label: schema.title,
        options: param.schema.enum
    } as InputProps

    BaseType.setOptionals(param, props);
    BaseType.setValidation(param, props);

    return {
        $cmp: 'FormKit',
        props
    };
}