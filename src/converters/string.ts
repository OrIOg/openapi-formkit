import { ParameterObject } from "@oats-ts/openapi-model";
import { SchemaObject } from "@oats-ts/json-schema-model";
import { getPlaceholderFromExamples } from "./util";

export function convertString(param: ParameterObject, schema: SchemaObject) {
    let type = "text";
    if(schema.format) {
        switch(schema.format) {
            case 'telephone': // CUSTOM
                type = 'tel'
                break;
            case 'email': // CUSTOM
            case 'url': // CUSTOM
            case 'date':
            case 'password':
                type = schema.format;
                break;
            case 'date-time':
                type = "datetime"
                break;
            case 'binary':
                type = "file"
                break;
        }
    }

    const required = param.required ? true : undefined;
    const min = schema.minLength;
    const max = schema.maxLength;

    const validation = []
    if(required) validation.push("required")
    if(min||max) validation.push(`length:${min||0},${max}`)
    if(["email", "url"].includes(type)) validation.push(type);

    const placeholders = getPlaceholderFromExamples(param);

    let props = {
        type,
        name: param.name,
        label: param.name
    } as Record<string, string>

    if(placeholders) props.placeholder = placeholders;
    if(validation) props.validation = validation.join('|');
    if(param.description) props.help = param.description


    return {
        $cmp: 'FormKit',
        props
    };
}
