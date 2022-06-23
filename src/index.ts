import { Options } from './types';
import SwaggerParser from "@apidevtools/swagger-parser"
import Converter from './converters/converter';
import { OpenAPIObject } from 'openapi3-ts';

export { Converter }

export async function Convert(src: string, options?: Partial<Options>) {
    let parser = new SwaggerParser()
    let obj = await parser.dereference(src) as OpenAPIObject;

    
    const converter = new Converter({ ... { step: 0.1, transformers: [] }, ...options} as Options   );
    return converter.convert(obj);
}

