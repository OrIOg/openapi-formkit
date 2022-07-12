import { ParameterObject, PathItemObject, RequestBodyObject, OpenAPIObject } from 'openapi3-ts';
import { convertBoolean, convertNumber, convertString } from '.';
import { FormKitGroup, FormKitItem, Parameter, FormKitInput, Options, method, Route, UniversalProps,SchemaObject } from '../types';
import { convertEnum } from './enum';

export default class Converter {
    protected options: Options;
    constructor(options: Partial<Options>) {
        this.options = { ... { 
                step: 0.1,
                transformers: [],
                operationTransformers: [Converter.OperationToForm]
            }, 
        ...options } as Options;
    }
    
    public static OperationToForm(path: string, op: method, options: Options, parameters: FormKitItem[]) {
        return {
            $cmp: "FormKit",
            props: {
                type: "form",
                method: op
            },
            children: parameters
        }
    }

    public convert(obj: OpenAPIObject) {
        let pathsParameters = {} as Record<string, Record<method, Route>>;

        // TODO: Add Common parameters: https://swagger.io/docs/specification/describing-parameters
        for(let route in obj.paths) {
            const path = obj.paths[route] as PathItemObject
            
            const opTypes = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'] as method[];
            
            let routes = {} as Record<method, Route>;
            for (const op of opTypes) {
                if(!path[op]) continue
                let parameters = [] as FormKitItem[];

                if(path[op]!.parameters) {
                    parameters = this.readParameters(path[op]!.parameters as ParameterObject[]);
                }
                
                if(path[op]!.requestBody) {
                    parameters = this.readRequestBody(path[op]!.requestBody as RequestBodyObject);
                }

                routes[op] = this.applyOperationTransformers(route, op, parameters);    
            }

            pathsParameters[route] = routes
        }

        return pathsParameters;
    }

    public readParameter(param: Parameter): FormKitItem | undefined {
        const schema = param.schema;
        if(schema.enum) return convertEnum(param, this.options);
        switch (schema!.type) {
            case 'number':
            case 'integer':
                return convertNumber(param, this.options);
            case 'string':
                return convertString(param, this.options);
            case 'boolean':
                return convertBoolean(param, this.options);
            case 'object':
                return this.readObject(param);
            default:
                console.warn(`'${schema.type}' is not yet implemented`);
                console.log(JSON.stringify(param));
                break;
        }
    }

    public readObject(parameter: Parameter): FormKitGroup {
        const convertedParams = [];
        const schema = (parameter.schema as SchemaObject);
        const required = new Set(parameter.schema.required ?? []);
        for (const propertyName in schema.properties) {
            const property = schema.properties[propertyName] as SchemaObject;
            const name = propertyName
            const converted = this.readParameter({schema: property, name});
            if(converted) {
                if (required.has(propertyName))
                    if ('validation' in converted!.props)
                        converted!.props.validation!.push(['required'])
                    else
                        converted!.props.validation = [['required']]
                this.applyTransformers(parameter, converted);
                convertedParams.push(converted);
            }
        }
        
        return { 
            '$formkit': 'group', 
            name: parameter.name,
            children: convertedParams,
            props: {} as UniversalProps
        }
    }

    public applyTransformers(parameter: Parameter, item: FormKitItem) {
        this.options.transformers.forEach(transformer => {
            item = transformer(parameter, this.options, item)
        })
        return item
    }

    public applyOperationTransformers(path: string, op: method, item: Route) {
        this.options.operationTransformers.forEach(transformer => {
            item = transformer(path, op, this.options, item)
        })
        return item
    }

    public readParameters(parameters: ParameterObject[]): FormKitItem[] {
        let convertedParams = [] as FormKitItem[];
        for(let parameter of parameters) {
            if(!parameter.schema) continue
            const converted = this.readParameter(parameter as Parameter);
            if(converted) { 
                this.applyTransformers(parameter as Parameter, converted)
                convertedParams.push(converted);
            }
        }
        return convertedParams
    }

    public readRequestBody(body: RequestBodyObject) {
        let convertedParams = [] as FormKitItem[];
        for (const mediaType in body.content) {
            const media = body.content[mediaType];
            let schema = (media.schema as SchemaObject);
            const required = new Set(schema.required ?? []);
            for (const propertyName in schema.properties) {
                const property = schema.properties[propertyName] as SchemaObject;
                const name = propertyName
                const parameter = {schema: property, name} as Parameter
                const converted = this.readParameter(parameter) as FormKitInput;
                if(converted) { 
                    if (required.has(propertyName))
                        if ('validation' in converted!.props)
                            converted!.props.validation!.push(['required'])
                        else
                            converted!.props.validation = [['required']]
                    this.applyTransformers(parameter, converted)
                    convertedParams.push(converted)
                };
            }
        }
        return convertedParams
    }
}