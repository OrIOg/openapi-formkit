import { Options } from './../types/index.d';
import { InputProps, Parameter, FormKitInput } from "../types";
import { BaseType } from "./base";

export function isInteger(param: Parameter) {
    return param.schema.type == "integer"  
}

export function convertNumber(param: Parameter, options: Options): FormKitInput {
    const schema = param.schema;
    
    const isInt = isInteger(param);

    if (schema.minimum !== undefined && schema.exclusiveMinimum !== undefined)
        throw `${param.name}: 'minimum' and 'exclusiveMinimum' shouldn't be set at the same time.`
    
    if (schema.maximum !== undefined && schema.exclusiveMaximum !== undefined)
        throw `${param.name}: 'maximum' and 'exclusiveMaximum' shouldn't be set at the same time.`

    let min = schema.exclusiveMinimum ?? schema.minimum;
    if (min !== undefined)
        min = min + (schema.exclusiveMinimum !== undefined ? (isInt ? 1 : options.step) : 0);
    
    let max = schema.exclusiveMaximum ?? schema.maximum;
    if (max !== undefined)
        max = max - (schema.exclusiveMaximum !== undefined ? (isInt ? 1 : options.step) : 0);

    let props = {
        type: min !== undefined && max !== undefined ? 'range' : 'number',
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
