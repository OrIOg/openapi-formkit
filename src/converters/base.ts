import { InputProps, Parameter } from "../types";
import { getPlaceholderFromExamples } from "./util";

export namespace BaseType {
    export function setOptionals(param: Parameter, data: InputProps) {
        const schema = param.schema;
        if(schema.default !== undefined) data.value = schema.default;

        const placeholders = getPlaceholderFromExamples(param);
        if(placeholders !== undefined) data.placeholder = placeholders;
        
        if(schema.description !== undefined) data.help = schema.description;
    }

    export function setValidation(param: Parameter, props: InputProps, validationData = [] as any[]) {
        const required = param.required ? 'required' : undefined;
        validationData.push(required);
        const validation = validationData.filter(a => a).map(a => [a]);
        if(validation.length > 0)
            props.validation = validation;
    }
}