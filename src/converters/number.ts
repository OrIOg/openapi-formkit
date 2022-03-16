import { InputProps, Parameter, FormKitInput } from "../types";
import { getPlaceholderFromExamples } from "./util";

export function isInteger(param: Parameter) {
    return param.schema.type == "integer"  
}

export function convertNumber(param: Parameter): FormKitInput {
    const schema = param.schema;
    const required = param.required ? true : undefined;
    const isInt = isInteger(param);

    let min = schema.minimum;
    if (min)
        min = min + (schema.exclusiveMinimum ? (isInt ? 1 : Number.MIN_VALUE) : 0);
    
    let max = schema.maximum;
    if (max)
        max = max + (schema.exclusiveMaximum ? (isInt ? 1 : Number.MIN_VALUE) : 0);

    const validation = []
    if(required) validation.push("required")

    const placeholders = getPlaceholderFromExamples(param);

    let props = {
        type: 'number',
        name: param.name,
        label: schema.title
    } as InputProps

    if(schema.default) props.value = schema.default;
    if(placeholders) props.placeholder = placeholders;
    if(validation) props.validation = validation.join('|');
    if(param.description) props.help = param.description;
    if(min) props.min = min;
    if(max) props.max = max;


    return {
        $cmp: 'FormKit',
        props
    };
}
