import { Options } from './../types/index.d';
import { Parameter, FormKitInput } from "../types";
import Converter from './converter';
import { SchemaObject } from 'openapi3-ts';

export function convertAllOf(param: Parameter, options: Options): FormKitInput {
    const schema = param.schema;
    if(!schema.allOf)
        throw "'allOf' converter called on non-allOf schema."
    const converter = new Converter(options)

    const schemas = schema.allOf;
    if(schemas.length == 0)
        throw "'allOf' with empty set."
    else if(schemas.length == 1) {
        const uniqueSchema = schemas[0] as SchemaObject;
        uniqueSchema.default = schema.default;
        return converter.readParameter({ name: param.name, schema: schemas[0] }) as FormKitInput
    } else
        throw "'allOf' not fully implemented yet. 'allOf' can only work with one type/$ref at the moment."
}
