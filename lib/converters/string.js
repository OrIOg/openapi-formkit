"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertString = void 0;
const util_1 = require("./util");
function convertString(param) {
    const schema = param.schema;
    let type = "text";
    if (schema.format) {
        switch (schema.format) {
            case 'telephone': // CUSTOM
                type = 'tel';
                break;
            case 'email': // CUSTOM
            case 'url': // CUSTOM
            case 'date':
            case 'password':
                type = schema.format;
                break;
            case 'date-time':
                type = "datetime";
                break;
            case 'binary':
                type = "file";
                break;
            default:
                console.warn(`'${schema.type}:${schema.type}' is not yet implemented`);
                break;
        }
    }
    const required = param.required ? true : undefined;
    const min = schema.minLength;
    const max = schema.maxLength;
    const validation = [];
    if (required)
        validation.push("required");
    if (min || max)
        validation.push(`length:${min || 0},${max || ''}`);
    if (["email", "url"].includes(type))
        validation.push(type);
    const placeholders = (0, util_1.getPlaceholderFromExamples)(param);
    let props = {
        type,
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
    return {
        $cmp: 'FormKit',
        props
    };
}
exports.convertString = convertString;
//# sourceMappingURL=string.js.map