
# AllMusicDto


## Properties

Name | Type
------------ | -------------
`artistName` | string
`albums` | [Array&lt;AlbumDto&gt;](AlbumDto.md)

## Example

```typescript
import type { AllMusicDto } from ''

// TODO: Update the object below with actual values
const example = {
  "artistName": null,
  "albums": null,
} satisfies AllMusicDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AllMusicDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


