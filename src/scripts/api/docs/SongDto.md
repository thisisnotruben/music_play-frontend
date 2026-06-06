
# SongDto


## Properties

Name | Type
------------ | -------------
`type` | string
`coverPath` | string
`id` | number
`name` | string
`genre` | string
`length` | number
`audioPath` | string
`albumName` | string
`albumId` | number
`artistName` | string

## Example

```typescript
import type { SongDto } from ''

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "coverPath": null,
  "id": null,
  "name": null,
  "genre": null,
  "length": null,
  "audioPath": null,
  "albumName": null,
  "albumId": null,
  "artistName": null,
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


