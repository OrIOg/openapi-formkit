import { ParameterObject, RequestBodyObject, SchemaObject } from 'openapi3-ts';
import { convertBoolean, convertNumber, convertString } from '.';
import { FormKitGroup, FormKitItem, Parameter, FormKitInput } from './../types/index.d';

export function readParameter(param: Parameter): FormKitItem | undefined {
    const schema = param.schema;
    switch (schema!.type) {
        case 'number':
        case 'integer':
            return convertNumber(param);
        case 'string':
            return convertString(param);
        case 'boolean':
            return convertBoolean(param);
        case 'object':
            return readObject(param);
        default:
            console.warn(`'${schema.type}' is not yet implemented`);
            break;
    }
}

export function getPlaceholderFromExamples(param: Parameter) : string | undefined {
    let examples: string[] = []
    if (param.example) examples.push(param.example);
    if (param.examples) {
        for (const k in param.examples) {
            let example = param.examples[k];
            if("value" in example) {
                examples.push(example.value);
            }
        }
    }

    return examples.length ? examples.join(', ') : undefined;
}

export function readObject(param: Parameter): FormKitGroup {
    let convertedParams = [];
    let schema = (param.schema as SchemaObject);
    for (const propertyName in schema.properties) {
        const property = schema.properties[propertyName] as SchemaObject;
        const name = propertyName
        const converted = readParameter({schema: property, name});
        if(converted) convertedParams.push(converted);
    }
    
    return { 
        '$formkit': 'group', 
        name: param.name,
        children: convertedParams
    }
}

export function readParameters(parameters: ParameterObject[]): FormKitItem[] {
    let convertedParams = [] as FormKitItem[];
    for(let param of parameters) {
        if(!param.schema) continue
        const converted = readParameter(param as Parameter);
        if(converted) convertedParams.push(converted);
    }
    return convertedParams
}

export function readRequestBody(body: RequestBodyObject) {
    let convertedParams = [] as FormKitItem[];
    for (const mediaType in body.content) {
        const media = body.content[mediaType];
        let schema = (media.schema as SchemaObject);
        for (const propertyName in schema.properties) {
            const property = schema.properties[propertyName] as SchemaObject;
            const name = propertyName
            const converted = readParameter({schema: property, name}) as FormKitInput;
            if(converted) { 
                if (schema.required && propertyName in schema.required)
                    if (converted!.props.validation)
                        converted!.props.validation += '|required'
                    else
                        converted!.props.validation = 'required'
                convertedParams.push(converted)
            };
        }
    }
    return convertedParams
}