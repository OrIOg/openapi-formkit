import { FormKitItem, method, Options, Route } from './types/index.d';
import SwaggerParser from "@apidevtools/swagger-parser"
import Converter from './converters/converter';
import { OpenAPIObject, ParameterObject, PathItemObject, RequestBodyObject } from 'openapi3-ts';

export { Converter }

export async function Convert(api: string, options: Options = { step: 0.1 }) {
    let parser = new SwaggerParser()
    let obj = await parser.dereference(api) as OpenAPIObject;

    const converter = new Converter(options);
    return converter.convert(obj);
}

Convert("http://localhost:8000")