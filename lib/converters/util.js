"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaceholderFromExamples = void 0;
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
//# sourceMappingURL=util.js.map