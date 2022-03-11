import { FormKitItem } from './types/index.d';
import SwaggerParser from "@apidevtools/swagger-parser"
import { readParameters, readRequestBody } from './converters/util';
import { OpenAPIObject, PathItemObject } from 'openapi3-ts';

export async function Convert(api: string) {
    let parser = new SwaggerParser()
    let obj = await parser.dereference(api) as OpenAPIObject;

    let pathsParameters = {} as Record<string, FormKitItem[]>;
    
    for(let route in obj.paths) {
        const path = obj.paths[route] as PathItemObject
        let parameters = [] as FormKitItem[];
        
        const opTypes = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'];
        for (const op of opTypes) {
            if(path[op] && path[op].parameters) {
                parameters = readParameters(path[op].parameters);
            }
            if(path[op] && path[op].requestBody) {
                parameters = readRequestBody(path[op].requestBody);
            }
        }

        pathsParameters[route] = parameters; 
    }

    return pathsParameters;
}