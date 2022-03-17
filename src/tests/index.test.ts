import { Convert } from "../index"
import expectedOutputOpenAPI from "./docs/expected/openapi-formkit.json"
import expectedOutputString from "./docs/expected/string.json"
import expectedOutputNumber from "./docs/expected/number.json"

test("String test", async () => {
    expect(await Convert("./src/tests/docs/string.json")).toStrictEqual(expectedOutputString);
});

test("Number test", async () => {
expect(await Convert("./src/tests/docs/number.json")).toStrictEqual(expectedOutputNumber); 
});

test("Full openapi test", async () => {
  expect(await Convert("./src/tests/docs/openapi.json")).toStrictEqual(expectedOutputOpenAPI);
});