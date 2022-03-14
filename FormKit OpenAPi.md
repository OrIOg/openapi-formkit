[[https://swagger.io/docs/specification/data-models/data-types|OpenAPI DataTypes]]

OpenAPI Types | Format | FormKit Types | Description
------------- | ------ | ------------- | -----------
number | | number/slider
number | float | number/slider
number | double | number/slider
 | |
integer | | number/slider
integer | int32 | number/slider
integer | int64 | number/slider
 |
boolean | | checkbox
 |
array | | |  Repeat/List of Data Types
 |
object | | | Group of Data Types
 |
string | | text/textarea 
string | date | date
string | date-time | datetime
string | password | password
string | byte  | file  | Represents base64-encoded file contents
string | binary | file? | Represents binary file contents
string | *CUSTOM* | email
string? | *CUSTOM* | color
 | | | month
 | | | radio
 | | | search
 | | | select | Select from a list of options
string | *CUSTOM* | telephone
 | | | search
 | | | time
string | *CUSTOM* | url
 | | | week
string | | select | if *enum* key/pair is set

Implement string formats as format is an openvalue ? like email etc to match every inputs


# Keywords
OpenAPI | FormKit  | Description
------- | -------- | -----------
minimum | min | numbers only
maximum | max | numbers only
exclusiveMinimum | X | false >=, true >
exclusiveMaximum | X | false <=, true <
multipleOf | | Multiple can only be a posistive number
||
minLength | length:{MIN},{MAX} |
maxLength | length:{MIN},{MAX} |
pattern | | Define RegEx to match string
items | | spec of an array's items, if empty object, types are arbitrary
minItems | | min length of array 
max Items | | max length of array
unique Items | | array must be made of unique items



