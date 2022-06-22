# OpenAPI VueFormulate
Transform an OpenAPI document to a VueFormulate JSON Form generation

> import { Convert } from 'openapi-formkit'    
>
>// Helper function to convert from url or file openapi document
>Convert(<url/path>, options)

Or 

> import { Converter } from 'openapi-formkit'    
>
>// Convert a JS object representating a dereferenced OpenAPI document
>new Converter(options).convert(object)


Options: 
- step: Default step for number and range inputs
- transformers: List of transformer function which apply to every parameters/object fields 

Passed arguments to a transformer function:
 - OpenAPI parameter or object field
 - The options passed to the converter
 - The item to transform


Return a promise with the result.
