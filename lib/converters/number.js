"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertNumber = exports.isInteger = void 0;
const util_1 = require("./util");
function isInteger(value, format) {
    return format ? !(format in ["float", "double"]) : Number.isInteger(value);
}
exports.isInteger = isInteger;
function convertNumber(param) {
    const schema = param.schema;
    const required = param.required ? true : undefined;
    let min = schema.minimum;
    if (min)
        min = min + (schema.exclusiveMinimum ? (isInteger(min, schema.format) ? 1 : Number.MIN_VALUE) : 0);
    let max = schema.maximum;
    if (max)
        max = max + (schema.exclusiveMaximum ? (isInteger(max, schema.format) ? 1 : Number.MIN_VALUE) : 0);
    const validation = [];
    if (required)
        validation.push("required");
    const placeholders = (0, util_1.getPlaceholderFromExamples)(param);
    let props = {
        type: 'number',
        name: param.name,
        label: param.name
    };
    if (schema.default)
        props.value = schema.default;
    if (placeholders)
        props.placeholder = placeholders;
    if (validation)
        props.validation = validation.join('|');
    if (param.description)
        props.help = param.description;
    if (min)
        props.min = min;
    if (max)
        props.max = max;
    return {
        $cmp: 'FormKit',
        props
    };
}
exports.convertNumber = convertNumber;
//# sourceMappingURL=number.js.map