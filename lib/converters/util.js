"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readRequestBody = exports.readParameters = exports.readObject = exports.getPlaceholderFromExamples = exports.readParameter = exports.readEnum = void 0;
const _1 = require(".");
function readEnum(param) {
    const schema = param.schema;
    const required = param.required ? true : undefined;
    const validation = [];
    if (required)
        validation.push("required");
    const placeholders = getPlaceholderFromExamples(param);
    let props = {
        type: 'select',
        name: param.name,
        label: schema.title,
        options: param.schema.enum
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
exports.readEnum = readEnum;
function readParameter(param) {
    const schema = param.schema;
    if (schema.enum)
        return readEnum(param);
    switch (schema.type) {
        case 'number':
        case 'integer':
            return (0, _1.convertNumber)(param);
        case 'string':
            return (0, _1.convertString)(param);
        case 'boolean':
            return (0, _1.convertBoolean)(param);
        case 'object':
            return readObject(param);
        default:
            console.warn(`'${schema.type}' is not yet implemented`);
            console.log(JSON.stringify(param));
            break;
    }
}
exports.readParameter = readParameter;
function getPlaceholderFromExamples(param) {
    let examples = [];
    if (param.example)
        examples.push(param.example);
    if (param.examples) {
        for (const k in param.examples) {
            let example = param.examples[k];
            if ("value" in example) {
                examples.push(example.value);
            }
        }
    }
    return examples.length ? examples.join(', ') : undefined;
}
exports.getPlaceholderFromExamples = getPlaceholderFromExamples;
function readObject(param) {
    let convertedParams = [];
    let schema = param.schema;
    for (const propertyName in schema.properties) {
        const property = schema.properties[propertyName];
        const name = propertyName;
        const converted = readParameter({ schema: property, name });
        if (converted)
            convertedParams.push(converted);
    }
    return {
        '$formkit': 'group',
        name: param.name,
        children: convertedParams
    };
}
exports.readObject = readObject;
function readParameters(parameters) {
    let convertedParams = [];
    for (let param of parameters) {
        if (!param.schema)
            continue;
        const converted = readParameter(param);
        if (converted)
            convertedParams.push(converted);
    }
    return convertedParams;
}
exports.readParameters = readParameters;
function readRequestBody(body) {
    let convertedParams = [];
    for (const mediaType in body.content) {
        const media = body.content[mediaType];
        let schema = media.schema;
        for (const propertyName in schema.properties) {
            const property = schema.properties[propertyName];
            const name = propertyName;
            const converted = readParameter({ schema: property, name });
            if (converted) {
                if (schema.required && propertyName in schema.required)
                    if (converted.props.validation)
                        converted.props.validation += '|required';
                    else
                        converted.props.validation = 'required';
                convertedParams.push(converted);
            }
            ;
        }
    }
    return convertedParams;
}
exports.readRequestBody = readRequestBody;
//# sourceMappingURL=util.js.map