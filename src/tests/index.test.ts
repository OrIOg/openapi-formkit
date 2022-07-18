import { Convert } from "../index"
import expectedOutputOpenAPI from "./docs/expected/openapi-formkit.json"
import expectedOutputString from "./docs/expected/string.json"
import expectedOutputNumber from "./docs/expected/number.json"
import expectedOutputTransformer from "./docs/expected/transformer.json"
import expectedOutputOperationTransformer from "./docs/expected/operationTransformer.json"
import expectedOutputCombinatory from "./docs/expected/combinatory.json"
import { FormKitItem, Options, Parameter } from "../types"

test("String test", async () => {
    expect(await Convert("./src/tests/docs/string.json")).toStrictEqual(expectedOutputString);
});

test("Number test", async () => {
expect(await Convert("./src/tests/docs/number.json")).toStrictEqual(expectedOutputNumber); 
});

test("Transformers test", async () => {
  expect(await Convert("./src/tests/docs/transformer.json", {
    transformers: [
      (_, __, item: FormKitItem) => {
        (item.props.validation as Array<any>).forEach((rule, index, rules) => rules[index][0] = `(200)${rule}`)
        return item
      }
    ]
  })).toStrictEqual(expectedOutputTransformer);
});

test("Operation transformers test", async () => {
  expect(await Convert("./src/tests/docs/transformer.json", {
    operationTransformers: []
  })).toStrictEqual(expectedOutputOperationTransformer);
});

test("Full openapi test", async () => {
  expect(await Convert("./src/tests/docs/openapi.json")).toStrictEqual(expectedOutputOpenAPI);
});

test("Combinatory keywords test", async () => {
  expect(await Convert("./src/tests/docs/combinatory.json")).toStrictEqual(expectedOutputCombinatory);
});