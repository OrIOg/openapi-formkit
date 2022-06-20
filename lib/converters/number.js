"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertNumber = exports.isInteger = void 0;
const base_1 = require("./base");
function isInteger(param) {
    return param.schema.type == "integer";
}
exports.isInteger = isInteger;
function convertNumber(param, options) {
    const schema = param.schema;
    const isInt = isInteger(param);
    if (schema.minimum !== undefined && schema.exclusiveMinimum !== undefined)
        throw `${param.name}: 'minimum' and 'exclusiveMinimum' shouldn't be set at the same time.`;
    if (schema.maximum !== undefined && schema.exclusiveMaximum !== undefined)
        throw `${param.name}: 'maximum' and 'exclusiveMaximum' shouldn't be set at the same time.`;
    let min = schema.exclusiveMinimum ?? schema.minimum;
    if (min !== undefined)
        min = min + (schema.exclusiveMinimum !== undefined ? (isInt ? 1 : options.step) : 0);
    let max = schema.exclusiveMaximum ?? schema.maximum;
    if (max !== undefined)
        max = max - (schema.exclusiveMaximum !== undefined ? (isInt ? 1 : options.step) : 0);
    let props = {
        type: min !== undefined && max !== undefined ? 'range' : 'number',
        name: param.name,
        label: schema.title || param.name,
        step: isInt ? 1 : options.step
    };
    if (min !== undefined)
        props.min = min;
    if (max !== undefined)
        props.max = max;
    base_1.BaseType.setOptionals(param, props);
    base_1.BaseType.setValidation(param, props);
    return {
        $cmp: 'FormKit',
        props
    };
}
exports.convertNumber = convertNumber;
//# sourceMappingURL=number.js.map