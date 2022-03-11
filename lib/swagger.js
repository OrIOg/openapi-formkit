"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_parser_1 = __importDefault(require("@apidevtools/swagger-parser"));
const converters_1 = require("./converters");
(async () => {
    let parser = new swagger_parser_1.default();
    let obj = await parser.dereference('src/tests/docs/openapi.json');
    let pathsParameters = {};
    for (let k in obj.data.document.paths) {
        const path = obj.data.document.paths[k];
        let parameters = [];
        if (path.get?.parameters) {
            for (let param of path.get?.parameters) {
                switch (param.schema?.type) {
                    case 'number':
                    case 'integer':
                        parameters.push((0, converters_1.convertNumber)(param, param.schema));
                        break;
                    case 'string':
                        parameters.push((0, converters_1.convertString)(param, param.schema));
                        break;
                    default:
                        console.warn(`'${param.schema?.type}' is not yet implemented`);
                        break;
                }
            }
        }
        pathsParameters[k] = parameters;
    }
    return pathsParameters;
})();
//# sourceMappingURL=swagger.js.map