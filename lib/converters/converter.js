"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const enum_1 = require("./enum");
class Converter {
    options;
    constructor(options) {
        this.options = { ...{
                step: 0.1,
                transformers: [],
                operationTransformers: [Converter.OperationToForm]
            },
            ...options };
    }
    static OperationToForm(path, op, options, parameters) {
        return {
            $cmp: "FormKit",
            props: {
                type: "form",
                method: op
            },
            children: parameters
        };
    }
    convert(obj) {
        let pathsParameters = {};
        // TODO: Add Common parameters: https://swagger.io/docs/specification/describing-parameters
        for (let route in obj.paths) {
            const path = obj.paths[route];
            const opTypes = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'];
            let routes = {};
            for (const op of opTypes) {
                if (!path[op])
                    continue;
                let parameters = [];
                if (path[op].parameters) {
                    parameters = this.readParameters(path[op].parameters);
                }
                if (path[op].requestBody) {
                    parameters = this.readRequestBody(path[op].requestBody);
                }
                routes[op] = this.applyOperationTransformers(route, op, parameters);
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
    readObject(parameter) {
        const convertedParams = [];
        const schema = parameter.schema;
        const required = new Set(parameter.schema.required ?? []);
        for (const propertyName in schema.properties) {
            const property = schema.properties[propertyName];
            const name = propertyName;
            const converted = this.readParameter({ schema: property, name });
            if (converted) {
                if (required.has(propertyName))
                    if ('validation' in converted.props)
                        converted.props.validation.push(['required']);
                    else
                        converted.props.validation = [['required']];
                this.applyTransformers(parameter, converted);
                convertedParams.push(converted);
            }
        }
        return {
            '$formkit': 'group',
            name: parameter.name,
            children: convertedParams,
            props: {}
        };
    }
    applyTransformers(parameter, item) {
        this.options.transformers.forEach(transformer => {
            item = transformer(parameter, this.options, item);
        });
        return item;
    }
    applyOperationTransformers(path, op, item) {
        this.options.operationTransformers.forEach(transformer => {
            item = transformer(path, op, this.options, item);
        });
        return item;
    }
    readParameters(parameters) {
        let convertedParams = [];
        for (let parameter of parameters) {
            if (!parameter.schema)
                continue;
            const converted = this.readParameter(parameter);
            if (converted) {
                this.applyTransformers(parameter, converted);
                convertedParams.push(converted);
            }
        }
        return convertedParams;
    }
    readRequestBody(body) {
        let convertedParams = [];
        for (const mediaType in body.content) {
            const media = body.content[mediaType];
            let schema = media.schema;
            const required = new Set(schema.required ?? []);
            for (const propertyName in schema.properties) {
                const property = schema.properties[propertyName];
                const name = propertyName;
                const parameter = { schema: property, name };
                const converted = this.readParameter(parameter);
                if (converted) {
                    if (required.has(propertyName))
                        if ('validation' in converted.props)
                            converted.props.validation.push(['required']);
                        else
                            converted.props.validation = [['required']];
                    this.applyTransformers(parameter, converted);
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