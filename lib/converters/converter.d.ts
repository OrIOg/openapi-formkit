import { ParameterObject, RequestBodyObject, OpenAPIObject } from 'openapi3-ts';
import { FormKitGroup, FormKitItem, Parameter, Options, method, Route } from '../types';
export default class Converter {
    protected options: Options;
    constructor(options: Options);
    convert(obj: OpenAPIObject): Record<string, Record<method, Route>>;
    readParameter(param: Parameter): FormKitItem | undefined;
    readObject(param: Parameter): FormKitGroup;
    applyTransformers(parameter: Parameter, item: FormKitItem): void;
    readParameters(parameters: ParameterObject[]): FormKitItem[];
    readRequestBody(body: RequestBodyObject): FormKitItem[];
}
