"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertBoolean = void 0;
const base_1 = require("./base");
function convertBoolean(param, options) {
    const schema = param.schema;
    let props = {
        type: 'checkbox',
        name: param.name,
        label: schema.title || param.name
    };
    base_1.BaseType.setOptionals(param, props);
    base_1.BaseType.setValidation(param, props);
    return {
        $cmp: 'FormKit',
        props
    };
}
exports.convertBoolean = convertBoolean;
//# sourceMappingURL=boolean.js.map