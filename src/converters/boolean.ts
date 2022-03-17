import { InputProps, Parameter, FormKitInput, Options } from "../types";
import { BaseType } from "./base";

export function convertBoolean(param: Parameter, options: Options): FormKitInput {
    const schema = param.schema;
    let props = {
        type: 'checkbox',
        name: param.name,
        label: schema.title || param.name
    } as InputProps

    BaseType.setOptionals(param, props);
    BaseType.setValidation(param, props);

    return {
        $cmp: 'FormKit',
        props
    };
}
