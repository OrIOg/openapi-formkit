import { ParameterObject } from "@oats-ts/openapi-model";
import { SchemaObject } from "@oats-ts/json-schema-model";
import { getPlaceholderFromExamples } from "./util";

export function isInteger(value: number, format: string | undefined) {
    return format ? !(format in ["float", "double"]) : Number.isInteger(value)  
}

export function convertNumber(param: ParameterObject, schema: SchemaObject) {
    let obj = {
        placeholder: getPlaceholderFromExamples(param)
    } as {
        required?: boolean;
        placeholder?: string;
        min?: number;
        max?: number;
    };
    const required = param.required ? true : undefined;

    const min = schema.minimum;
    if (min)
        obj.min = min + (schema.exclusiveMinimum ? (isInteger(min, schema.format) ? 1 : Number.MIN_VALUE) : min);
    
    const max = schema.maximum;
    if (max)
        obj.max = max + (schema.exclusiveMaximum ? (isInteger(max, schema.format) ? 1 : Number.MIN_VALUE) : max);

    return {
        $cmp: 'FormKit',
        props: {
            type: 'number',
            help: param.description,
            label: param.name,
            name: param.name,
            placeholder: obj.placeholder,
            validation: [
                required ? "required" : undefined,
            ].join('|') || undefined,
            min,
            max
        }
    };
}
