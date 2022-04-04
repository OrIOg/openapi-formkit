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
    if (min !== undefined)
        min = min + (schema.exclusiveMinimum ? (isInt ? 1 : options.step) : 0);
    
    let max = schema.maximum;
    if (max !== undefined)
        max = max + (schema.exclusiveMaximum ? (isInt ? 1 : options.step) : 0);

    let props = {
        type: min!== undefined && max !== undefined ? 'range' : 'number',
        name: param.name,
        label: schema.title || param.name,
        step: isInt ? 1 : options.step
    } as InputProps

    if(min !== undefined) props.min = min;
    if(max !== undefined) props.max = max;
    BaseType.setOptionals(param, props);
    BaseType.setValidation(param, props);

    return {
        $cmp: 'FormKit',
        props
    };
}
