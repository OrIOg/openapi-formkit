# OpenAPI FormKit
Transform an OpenAPI document to a FormKit schema

```typescript
import { Convert } from 'openapi-formkit'    

// Helper function to convert from url or file openapi document  
Convert(<url/path>, options)
```
Or

```typescript
import { Converter } from 'openapi-formkit'    

// Convert a JS object representating a dereferenced OpenAPI document  
new Converter(options).convert(object)
```  


Options: 
- **step**: Default step for number and range inputs
  - *default* : 0.1
- **transformers**: List of transformer function which apply to every parameters/object fields
  - *default* : [ ]
  - *definition* :
```typescript
(param: Parameter, options: Options, item: FormKitItem) => FormKitItem
```
- **operationTransformers**: List of transformer function which apply to every operation
  - *default* : [ Converter.OperationToForm ]
  - *definition* : 
```typescript
(path: string, op: method, options: Options, item: Route) => Route
```

Passed arguments to a transformer function:
 - OpenAPI parameter or object field
 - The options passed to the converter
 - The item to transform


Return a promise with the result.
