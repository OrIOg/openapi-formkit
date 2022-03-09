
import { isReferenceObject } from "@oats-ts/model-common"
import { ParameterObject } from "@oats-ts/openapi-model"

export function getPlaceholderFromExamples(param: ParameterObject) : string | undefined {
    let examples: string[] = []
    if (param.example) examples.push(param.example);
    if (param.examples) {
        for (const k in param.examples) {
            let example = param.examples[k];
            if(!isReferenceObject(example) && example.value) {
                examples.push(example.value);
            }
        }
    }

    return examples.length ? examples.join(', ') : undefined;
}