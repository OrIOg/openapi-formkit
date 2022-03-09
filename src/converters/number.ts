import { ParameterObject } from "@oats-ts/openapi-model";
import { SchemaObject } from "@oats-ts/json-schema-model";
import { getPlaceholderFromExamples } from "./util";

export function isInteger(value: number, format: string | undefined) {
    return format ? !(format in ["float", "double"]) : Number.isInteger(value)  
}

export function convertNumber(param: ParameterObject, schema: SchemaObject) {

    const required = param.required ? true : undefined;

    let min = schema.minimum;
    if (min)
        min = min + (schema.exclusiveMinimum ? (isInteger(min, schema.format) ? 1 : Number.MIN_VALUE) : min);
    
    let max = schema.maximum;
    if (max)
        max = max + (schema.exclusiveMaximum ? (isInteger(max, schema.format) ? 1 : Number.MIN_VALUE) : max);

    const validation = []
    if(required) validation.push("required")

    const placeholders = getPlaceholderFromExamples(param);

    let props = {
        type: 'number',
        name: param.name,
        label: param.name
    } as Record<string, any>

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
