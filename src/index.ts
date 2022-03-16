import { FormKitItem, method, Route } from './types/index.d';
import SwaggerParser from "@apidevtools/swagger-parser"
import { readParameters, readRequestBody } from './converters/util';
import { OpenAPIObject, ParameterObject, PathItemObject, RequestBodyObject } from 'openapi3-ts';

export async function Convert(api: string) {
    let parser = new SwaggerParser()
    let obj = await parser.dereference(api) as OpenAPIObject;

    let pathsParameters = {} as Record<string, Record<method, Route>>;
    
    // TODO: Add Common parameters: https://swagger.io/docs/specification/describing-parameters
    for(let route in obj.paths) {
        const path = obj.paths[route] as PathItemObject
        
        const opTypes = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'] as method[];
        
        let routes = {} as Record<method, Route>;
        for (const op of opTypes) {
            let parameters = [] as FormKitItem[];
            if(path[op] && path[op]!.parameters) {
                parameters = readParameters(path[op]!.parameters as ParameterObject[]);
            }
            if(path[op] && path[op]!.requestBody) {
                parameters = readRequestBody(path[op]!.requestBody as RequestBodyObject);
            }

            if(parameters.length)
                routes[op] = {
                    $cmp: "FormKit",
                    props: {
                        type: "form",
                        method: op
                    },
                    children: parameters
                };
        }

        pathsParameters[route] = routes
    }

    return pathsParameters;
}