import { Options } from './types/index.d';
import SwaggerParser from "@apidevtools/swagger-parser"
import Converter from './converters/converter';
import { OpenAPIObject } from 'openapi3-ts';

export { Converter }

const defaultInputsWrapper = {
    $el: 'div',
    attrs: {
        class: "formkit-inputs"
    }
}

export async function Convert(src: string, options: Options = { step: 0.1, inputsWrapper: defaultInputsWrapper }) {
    let parser = new SwaggerParser()
    let obj = await parser.dereference(src) as OpenAPIObject;

    const converter = new Converter(options);
    return converter.convert(obj);
}