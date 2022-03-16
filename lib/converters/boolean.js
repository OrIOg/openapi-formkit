"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertBoolean = void 0;
const util_1 = require("./util");
function convertBoolean(param) {
    const schema = param.schema;
    const required = param.required ? true : undefined;
    const validation = [];
    if (required)
        validation.push("required");
    const placeholders = (0, util_1.getPlaceholderFromExamples)(param);
    let props = {
        type: 'checkbox',
        name: param.name,
        label: schema.title
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
exports.convertBoolean = convertBoolean;
//# sourceMappingURL=boolean.js.map