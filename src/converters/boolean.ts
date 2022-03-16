import { InputProps, Parameter, FormKitInput } from "../types";
import { getPlaceholderFromExamples } from "./util";


export function convertBoolean(param: Parameter): FormKitInput {
    const schema = param.schema;
    const required = param.required ? true : undefined;

    const validation = []
    if(required) validation.push("required")

    const placeholders = getPlaceholderFromExamples(param);

    let props = {
        type: 'checkbox',
        name: param.name,
        label: schema.title
    } as InputProps

    if(schema.default) props.value = schema.default;
    if(placeholders) props.placeholder = placeholders;
    if(validation) props.validation = validation.join('|');
    if(param.description) props.help = param.description;

    return {
        $cmp: 'FormKit',
        props
    };
}
