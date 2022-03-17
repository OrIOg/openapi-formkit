import { InputProps, Parameter } from "../types";
import { getPlaceholderFromExamples } from "./util";

export namespace BaseType {
    export function setOptionals(param: Parameter, data: InputProps) {
        const schema = param.schema;
        if(schema.default) data.value = schema.default;

        const placeholders = getPlaceholderFromExamples(param);
        if(placeholders) data.placeholder = placeholders;
        
        if(param.description) data.help = param.description;
    }

    export function setValidation(param: Parameter, props: InputProps, validationData = [] as any[]) {
        const required = param.required ? true : undefined;
        validationData.push(required);
        const validation = validationData.filter(a => a).map(a => [a]);
        if(validation.length > 0)
            props.validation = validation;
    }
}