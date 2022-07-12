import { ParameterObject, RequestBodyObject, OpenAPIObject } from 'openapi3-ts';
import { FormKitGroup, FormKitItem, Parameter, Options, method, Route } from '../types';
export default class Converter {
    protected options: Options;
    constructor(options: Partial<Options>);
    static OperationToForm(path: string, op: method, options: Options, parameters: FormKitItem[]): {
        $cmp: string;
        props: {
            type: string;
            method: method;
        };
        children: FormKitItem[];
    };
    convert(obj: OpenAPIObject): Record<string, Record<method, Route>>;
    readParameter(param: Parameter): FormKitItem | undefined;
    readObject(parameter: Parameter): FormKitGroup;
    applyTransformers(parameter: Parameter, item: FormKitItem): FormKitItem;
    applyOperationTransformers(path: string, op: method, item: Route): Route;
    readParameters(parameters: ParameterObject[]): FormKitItem[];
    readRequestBody(body: RequestBodyObject): FormKitItem[];
}
