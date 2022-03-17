"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = exports.Converter = void 0;
const swagger_parser_1 = __importDefault(require("@apidevtools/swagger-parser"));
const converter_1 = __importDefault(require("./converters/converter"));
exports.Converter = converter_1.default;
async function Convert(api, options = { step: 0.1 }) {
    let parser = new swagger_parser_1.default();
    let obj = await parser.dereference(api);
    const converter = new converter_1.default(options);
    return converter.convert(obj);
}
exports.Convert = Convert;
Convert("http://localhost:8000");
//# sourceMappingURL=index.js.map