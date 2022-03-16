"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
const swagger_parser_1 = __importDefault(require("@apidevtools/swagger-parser"));
const util_1 = require("./converters/util");
async function Convert(api) {
    let parser = new swagger_parser_1.default();
    let obj = await parser.dereference(api);
    let pathsParameters = {};
    // TODO: Add Common parameters: https://swagger.io/docs/specification/describing-parameters
    for (let route in obj.paths) {
        const path = obj.paths[route];
        const opTypes = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'];
        let routes = {};
        for (const op of opTypes) {
            let parameters = [];
            if (path[op] && path[op].parameters) {
                parameters = (0, util_1.readParameters)(path[op].parameters);
            }
            if (path[op] && path[op].requestBody) {
                parameters = (0, util_1.readRequestBody)(path[op].requestBody);
            }
            if (parameters.length)
                routes[op] = {
                    $cmp: "FormKit",
                    props: {
                        type: "form",
                        method: op
                    },
                    children: parameters
                };
        }
        pathsParameters[route] = routes;
    }
    return pathsParameters;
}
exports.Convert = Convert;
//# sourceMappingURL=index.js.map