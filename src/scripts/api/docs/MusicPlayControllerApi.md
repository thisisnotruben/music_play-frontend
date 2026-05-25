# MusicPlayControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addSongToPlaylist**](MusicPlayControllerApi.md#addsongtoplaylist) | **PUT** /api/v1/addSongToPlaylist | Add song to a specific playlist |
| [**createPlaylist**](MusicPlayControllerApi.md#createplaylist) | **POST** /api/v1/createPlaylist | Create a playlist |
| [**deletePlaylist**](MusicPlayControllerApi.md#deleteplaylist) | **DELETE** /api/v1/deletePlaylist | Delete a playlist |
| [**deleteSongFromPlaylist**](MusicPlayControllerApi.md#deletesongfromplaylist) | **DELETE** /api/v1/deleteSongFromPlaylist | Delete song from a specific playlist |
| [**getAlbums**](MusicPlayControllerApi.md#getalbums) | **GET** /api/v1/getAlbums | Get all albums |
| [**getAllMusic**](MusicPlayControllerApi.md#getallmusic) | **GET** /api/v1/getAllMusic | Get all music of library entire |
| [**getExploreFeed**](MusicPlayControllerApi.md#getexplorefeed) | **GET** /api/v1/getExploreFeed | Get explore feed |
| [**getPlaylists**](MusicPlayControllerApi.md#getplaylists) | **GET** /api/v1/getPlaylists | Get all playlists from user |



## addSongToPlaylist

> addSongToPlaylist(songId, playlistId)

Add song to a specific playlist

### Example

```ts
import {
  Configuration,
  MusicPlayControllerApi,
} from '';
import type { AddSongToPlaylistRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MusicPlayControllerApi();

  const body = {
    // number
    songId: 56,
    // number
    playlistId: 56,
  } satisfies AddSongToPlaylistRequest;

  try {
    const data = await api.addSongToPlaylist(body);
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
| **songId** | `number` |  | [Defaults to `undefined`] |
| **playlistId** | `number` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **404** | Song or Playlist not found |  -  |
| **400** | Bad Request |  -  |
| **200** | Ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createPlaylist

> createPlaylist(playlistName)

Create a playlist

### Example

```ts
import {
  Configuration,
  MusicPlayControllerApi,
} from '';
import type { CreatePlaylistRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MusicPlayControllerApi();

  const body = {
    // string
    playlistName: playlistName_example,
  } satisfies CreatePlaylistRequest;

  try {
    const data = await api.createPlaylist(body);
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
| **playlistName** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **404** | User not found |  -  |
| **400** | Bad Request |  -  |
| **200** | Ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deletePlaylist

> deletePlaylist(playlistId)

Delete a playlist

### Example

```ts
import {
  Configuration,
  MusicPlayControllerApi,
} from '';
import type { DeletePlaylistRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MusicPlayControllerApi();

  const body = {
    // number
    playlistId: 56,
  } satisfies DeletePlaylistRequest;

  try {
    const data = await api.deletePlaylist(body);
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
| **playlistId** | `number` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **404** | User or Playlist not found |  -  |
| **400** | Bad Request |  -  |
| **200** | Ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteSongFromPlaylist

> deleteSongFromPlaylist(songId, playlistId)

Delete song from a specific playlist

### Example

```ts
import {
  Configuration,
  MusicPlayControllerApi,
} from '';
import type { DeleteSongFromPlaylistRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MusicPlayControllerApi();

  const body = {
    // number
    songId: 56,
    // number
    playlistId: 56,
  } satisfies DeleteSongFromPlaylistRequest;

  try {
    const data = await api.deleteSongFromPlaylist(body);
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
| **songId** | `number` |  | [Defaults to `undefined`] |
| **playlistId** | `number` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **404** | Song or Playlist not found |  -  |
| **400** | Bad Request |  -  |
| **200** | Ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAlbums

> Array&lt;AlbumDto&gt; getAlbums()

Get all albums

### Example

```ts
import {
  Configuration,
  MusicPlayControllerApi,
} from '';
import type { GetAlbumsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MusicPlayControllerApi();

  try {
    const data = await api.getAlbums();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;AlbumDto&gt;**](AlbumDto.md)

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


## getAllMusic

> Array&lt;AllMusicDto&gt; getAllMusic()

Get all music of library entire

### Example

```ts
import {
  Configuration,
  MusicPlayControllerApi,
} from '';
import type { GetAllMusicRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MusicPlayControllerApi();

  try {
    const data = await api.getAllMusic();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;AllMusicDto&gt;**](AllMusicDto.md)

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


## getExploreFeed

> Array&lt;ExploreEntryDto&gt; getExploreFeed()

Get explore feed

### Example

```ts
import {
  Configuration,
  MusicPlayControllerApi,
} from '';
import type { GetExploreFeedRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MusicPlayControllerApi();

  try {
    const data = await api.getExploreFeed();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;ExploreEntryDto&gt;**](ExploreEntryDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **404** | User not found |  -  |
| **400** | Bad Request |  -  |
| **200** | Ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getPlaylists

> Array&lt;PlaylistDto&gt; getPlaylists()

Get all playlists from user

### Example

```ts
import {
  Configuration,
  MusicPlayControllerApi,
} from '';
import type { GetPlaylistsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MusicPlayControllerApi();

  try {
    const data = await api.getPlaylists();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;PlaylistDto&gt;**](PlaylistDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **404** | User not found |  -  |
| **400** | Bad Request |  -  |
| **200** | Ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

