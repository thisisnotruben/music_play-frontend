
# SongDto


## Properties

Name | Type
------------ | -------------
`name` | string
`artistName` | string
`genre` | string
`length` | number
`audioPath` | string
`coverPath` | string

## Example

```typescript
import type { SongDto } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "artistName": null,
  "genre": null,
  "length": null,
  "audioPath": null,
  "coverPath": null,
} satisfies SongDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SongDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


