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
    let min = schema.minimum;
    if (min)
        min = min + (schema.exclusiveMinimum ? (isInt ? 1 : options.step) : 0);
    let max = schema.maximum;
    if (max)
        max = max + (schema.exclusiveMaximum ? (isInt ? 1 : options.step) : 0);
    let props = {
        type: min && max ? 'range' : 'number',
        name: param.name,
        label: schema.title || param.name,
        step: isInt ? 1 : options.step
    };
    if (min)
        props.min = min;
    if (max)
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