"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseType = void 0;
const util_1 = require("./util");
var BaseType;
(function (BaseType) {
    function setOptionals(param, data) {
        const schema = param.schema;
        if (schema.default)
            data.value = schema.default;
        const placeholders = (0, util_1.getPlaceholderFromExamples)(param);
        if (placeholders)
            data.placeholder = placeholders;
        if (param.description)
            data.help = param.description;
    }
    BaseType.setOptionals = setOptionals;
    function setValidation(param, props, validationData = []) {
        const required = param.required ? true : undefined;
        validationData.push(required);
        const validation = validationData.filter(a => a).map(a => [a]);
        if (validation.length > 0)
            props.validation = validation;
    }
    BaseType.setValidation = setValidation;
})(BaseType = exports.BaseType || (exports.BaseType = {}));
//# sourceMappingURL=base.js.map