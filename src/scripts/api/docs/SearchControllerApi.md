# SearchControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getSearch**](SearchControllerApi.md#getsearch) | **GET** /api/v1/search | Search for artist/album/song name with filters |



## getSearch

> { [key: string]: any; } getSearch(query, filter)

Search for artist/album/song name with filters

### Example

```ts
import {
  Configuration,
  SearchControllerApi,
} from '';
import type { GetSearchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SearchControllerApi();

  const body = {
    // string
    query: query_example,
    // Array<string> (optional)
    filter: ...,
  } satisfies GetSearchRequest;

  try {
    const data = await api.getSearch(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **query** | `string` |  | [Defaults to `undefined`] |
| **filter** | `Array<string>` |  | [Optional] |

### Return type

**{ [key: string]: any; }**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **404** | Not Found |  -  |
| **400** | Bad Request |  -  |
| **200** | Ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

