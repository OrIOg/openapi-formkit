import extend from "extend"
import { FormKitItem, Options, SchemaObject } from './../types/index.d'
import { Parameter, FormKitInput } from "../types"
import Converter from './converter'

export function convertAllOf(param: Parameter, options: Options): FormKitItem {
    if(!param.schema.allOf)
        throw "'allOf' converter called on non-allOf schema."
    const converter = new Converter(options)

    const schemas = param.schema.allOf
    if(schemas.length == 0)
        throw "'allOf' with empty set."
    else if(schemas.length == 1) {
        const uniqueSchema = schemas[0] as SchemaObject
        uniqueSchema.default = param.schema.default;
        return converter.readParameter({ name: param.name, schema: schemas[0] }) as FormKitInput
    } else {
        const mixedSchema = extend(true, {}, ...schemas)
        return converter.readObject({ name: param.name, schema: mixedSchema })
        throw "'allOf' not fully implemented yet. 'allOf' can only work with one type/$ref at the moment."
    }
}
