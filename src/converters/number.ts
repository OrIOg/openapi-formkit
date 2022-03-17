import { Options } from './../types/index.d';
import { InputProps, Parameter, FormKitInput } from "../types";
import { BaseType } from "./base";

export function isInteger(param: Parameter) {
    return param.schema.type == "integer"  
}

export function convertNumber(param: Parameter, options: Options): FormKitInput {
    const schema = param.schema;
    const isInt = isInteger(param);

    let min = schema.minimum;
    if (min)
        min = min + (schema.exclusiveMinimum ? (isInt ? 1 : options.step) : 0);
    
    let max = schema.maximum;
    if (max)
        max = max + (schema.exclusiveMaximum ? (isInt ? 1 : options.step) : 0);

    let props = {
        type: min && max? 'range' : 'number',
        name: param.name,
        label: schema.title,
        step: isInt ? 1 : options.step
    } as InputProps

    if(min) props.min = min;
    if(max) props.max = max;
    BaseType.setOptionals(param, props);
    BaseType.setValidation(param, props);

    return {
        $cmp: 'FormKit',
        props
    };
}
