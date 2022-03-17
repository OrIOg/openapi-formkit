import { InputProps, Parameter } from "../types";
export declare namespace BaseType {
    function setOptionals(param: Parameter, data: InputProps): void;
    function setValidation(param: Parameter, props: InputProps, validationData?: any[]): void;
}
