"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertEnum = void 0;
const base_1 = require("./base");
function convertEnum(param, options) {
    const schema = param.schema;
    let props = {
        type: 'select',
        name: param.name,
        label: schema.title || param.name,
        options: param.schema.enum
    };
    base_1.BaseType.setOptionals(param, props);
    base_1.BaseType.setValidation(param, props);
    return {
        $cmp: 'FormKit',
        props
    };
}
exports.convertEnum = convertEnum;
//# sourceMappingURL=enum.js.map