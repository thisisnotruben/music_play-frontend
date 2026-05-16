
# AccountCreateDto


## Properties

Name | Type
------------ | -------------
`username` | string
`password` | string
`email` | string
`firstName` | string
`lastName` | string

## Example

```typescript
import type { AccountCreateDto } from ''

// TODO: Update the object below with actual values
const example = {
  "username": null,
  "password": null,
  "email": null,
  "firstName": null,
  "lastName": null,
} satisfies AccountCreateDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountCreateDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


