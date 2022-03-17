import { Parameter } from "../types";

export function getPlaceholderFromExamples(param: Parameter) : string | undefined {
    let examples: string[] = []
    if (param.example) examples.push(param.example);
    if (param.examples) {
        for (const k in param.examples) {
            let example = param.examples[k];
            if("value" in example) {
                examples.push(example.value);
            }
        }
    }

    return examples.length ? examples.join(', ') : undefined;
}