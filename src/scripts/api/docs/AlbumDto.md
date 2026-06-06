
# AlbumDto


## Properties

Name | Type
------------ | -------------
`type` | string
`coverPath` | string
`id` | number
`name` | string
`artistName` | string
`artistId` | number
`songs` | [Array&lt;SongDto&gt;](SongDto.md)

## Example

```typescript
import type { AlbumDto } from ''

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "coverPath": null,
  "id": null,
  "name": null,
  "artistName": null,
  "artistId": null,
  "songs": null,
} satisfies AlbumDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AlbumDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


