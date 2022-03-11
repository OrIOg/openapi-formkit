import { Convert } from "../index"
import expectedOutputOpenAPI from "./docs/expected/openapi-formkit.json"

test("String test", async () => {
    expect(await Convert("./src/tests/docs/string.json")).toStrictEqual({
        "/get-example": [
          {
            "$cmp": "FormKit",
            "props": {
              "type": "text",
              "name": "min",
              "label": "min",
              "validation": "required|length:3,"
            }
          },
          {
            "$cmp": "FormKit",
            "props": {
              "type": "text",
              "name": "max",
              "label": "max",
              "validation": "required|length:0,3"
            }
          },
          {
            "$cmp": "FormKit",
            "props": {
              "type": "text",
              "name": "minmax",
              "label": "minmax",
              "validation": "required|length:3,14"
            }
          },
          {
            "$cmp": "FormKit",
            "props": {
              "type": "email",
              "name": "email",
              "label": "email",
              "validation": "required|email"
            }
          },
          {
            "$cmp": "FormKit",
            "props": {
              "type": "tel",
              "name": "telephone",
              "label": "telephone",
              "validation": "required"
            }
          },
          {
            "$cmp": "FormKit",
            "props": {
              "type": "url",
              "name": "url",
              "label": "url",
              "validation": "required|url"
            }
          }
        ]
      }
    );
});

test("Number test", async () => {
expect(await Convert("./src/tests/docs/number.json")).toStrictEqual({
      "/number-examples": [
        {
          "$cmp": "FormKit",
          "props": {
            "type": "number",
            "name": "number",
            "label": "number",
            "validation": "required"
          }
        },
        {
          "$cmp": "FormKit",
          "props": {
            "type": "number",
            "name": "number-min",
            "label": "number-min",
            "min": 17,
            "validation": "required"
          }
        },
        {
          "$cmp": "FormKit",
          "props": {
            "type": "number",
            "name": "number-max",
            "label": "number-max",
            "max": 34,
            "validation": "required"
          }
        },
        {
          "$cmp": "FormKit",
          "props": {
            "type": "number",
            "name": "number-minmax",
            "label": "number-minmax",
            "min": 17,
            "max": 34,
            "validation": "required"
          }
        }
      ]
    }
  );
});

test("Full openapi test", async () => {
  expect(await Convert("./src/tests/docs/openapi.json")).toStrictEqual(expectedOutputOpenAPI);
});