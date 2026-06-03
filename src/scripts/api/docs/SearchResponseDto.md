
# SearchResponseDto


## Properties

Name | Type
------------ | -------------
`artists` | Array&lt;any&gt;
`albums` | [Array&lt;AlbumDto&gt;](AlbumDto.md)
`songs` | [Array&lt;SongDto&gt;](SongDto.md)

## Example

```typescript
import type { SearchResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "artists": null,
  "albums": null,
  "songs": null,
} satisfies SearchResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


