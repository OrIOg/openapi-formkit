import { FormKitInput, InputProps, Options, Parameter } from './../types/index.d';
import { BaseType } from './base';

export function convertString(param: Parameter, options: Options): FormKitInput {
    const schema = param.schema;
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
            default:
                console.warn(`'${schema.type}:${schema.type}' is not yet implemented`); 
                break
        }
    }

    const min = schema.minLength;
    const max = schema.maxLength;

    const validation = [];
    if(min||max) validation.push(`length:${min||0},${max||''}`);
    if(["email", "url"].includes(type)) validation.push(type);

    let props = {
        type,
        name: param.name,
        label: schema.title || param.name
    } as InputProps

    BaseType.setOptionals(param, props);
    BaseType.setValidation(param, props, validation);

    return {
        $cmp: 'FormKit',
        props
    };
}
