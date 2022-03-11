import { ParameterObject, RequestBodyObject } from 'openapi3-ts';
import { FormKitGroup, FormKitItem, Parameter } from './../types/index.d';
export declare function readParameter(param: Parameter): FormKitItem | undefined;
export declare function getPlaceholderFromExamples(param: Parameter): string | undefined;
export declare function readObject(param: Parameter): FormKitGroup;
export declare function readParameters(parameters: ParameterObject[]): FormKitItem[];
export declare function readRequestBody(body: RequestBodyObject): FormKitItem[];
