"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const enum_1 = require("./enum");
const deepcopy_1 = __importDefault(require("deepcopy"));
class Converter {
    options;
    constructor(options) {
        this.options = options;
    }
    convert(obj) {
        let pathsParameters = {};
        // TODO: Add Common parameters: https://swagger.io/docs/specification/describing-parameters
        for (let route in obj.paths) {
            const path = obj.paths[route];
            const opTypes = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'];
            let routes = {};
            for (const op of opTypes) {
                let parameters = [];
                if (path[op] && path[op].parameters) {
                    parameters = this.readParameters(path[op].parameters);
                }
                if (path[op] && path[op].requestBody) {
                    parameters = this.readRequestBody(path[op].requestBody);
                }
                if (parameters.length) {
                    routes[op] = {
                        $cmp: "FormKit",
                        props: {
                            type: "form",
                            method: op
                        },
                        children: parameters
                    };
                    if (this.options.inputsWrapper) {
                        const wrapper = (0, deepcopy_1.default)(this.options.inputsWrapper);
                        wrapper.children = parameters;
                        routes[op].children = [wrapper];
                    }
                }
            }
            pathsParameters[route] = routes;
        }
        return pathsParameters;
    }
    readParameter(param) {
        const schema = param.schema;
        if (schema.enum)
            return (0, enum_1.convertEnum)(param, this.options);
        switch (schema.type) {
            case 'number':
            case 'integer':
                return (0, _1.convertNumber)(param, this.options);
            case 'string':
                return (0, _1.convertString)(param, this.options);
            case 'boolean':
                return (0, _1.convertBoolean)(param, this.options);
            case 'object':
                return this.readObject(param);
            default:
                console.warn(`'${schema.type}' is not yet implemented`);
                console.log(JSON.stringify(param));
                break;
        }
    }
    readObject(param) {
        let convertedParams = [];
        let schema = param.schema;
        for (const propertyName in schema.properties) {
            const property = schema.properties[propertyName];
            const name = propertyName;
            const converted = this.readParameter({ schema: property, name });
            if (converted)
                convertedParams.push(converted);
        }
        return {
            '$formkit': 'group',
            name: param.name,
            children: convertedParams,
            props: {}
        };
    }
    readParameters(parameters) {
        let convertedParams = [];
        for (let param of parameters) {
            if (!param.schema)
                continue;
            const converted = this.readParameter(param);
            if (converted)
                convertedParams.push(converted);
        }
        return convertedParams;
    }
    readRequestBody(body) {
        let convertedParams = [];
        for (const mediaType in body.content) {
            const media = body.content[mediaType];
            let schema = media.schema;
            for (const propertyName in schema.properties) {
                const property = schema.properties[propertyName];
                const name = propertyName;
                const converted = this.readParameter({ schema: property, name });
                if (converted) {
                    if (schema.required && schema.required.includes(propertyName))
                        if ('validation' in converted.props)
                            converted.props.validation.push(['required']);
                        else
                            converted.props.validation = [['required']];
                    convertedParams.push(converted);
                }
                ;
            }
        }
        return convertedParams;
    }
}
exports.default = Converter;
//# sourceMappingURL=converter.js.map