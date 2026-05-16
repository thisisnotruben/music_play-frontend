# MusicPlayControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addSongToPlaylist**](MusicPlayControllerApi.md#addsongtoplaylist) | **POST** /api/v1/addSongToPlaylist | Add song to a specific playlist |
| [**createPlaylist**](MusicPlayControllerApi.md#createplaylist) | **POST** /api/v1/createPlaylist | Create a playlist |
| [**deletePlaylist**](MusicPlayControllerApi.md#deleteplaylist) | **POST** /api/v1/deletePlaylist | Delete a playlist |
| [**getAlbums**](MusicPlayControllerApi.md#getalbums) | **GET** /api/v1/getAlbums | Get all albums |
| [**getPlaylists**](MusicPlayControllerApi.md#getplaylists) | **GET** /api/v1/getPlaylists | Get all playlists from user |
| [**removeSongFromPlaylist**](MusicPlayControllerApi.md#removesongfromplaylist) | **POST** /api/v1/removeSongFromPlaylist | Removes song from a specific playlist |



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
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Ok |  -  |
| **404** | Song or Playlist not found |  -  |

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
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Ok |  -  |
| **404** | User not found |  -  |

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
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Ok |  -  |
| **404** | User or Playlist not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAlbums

> AlbumListDto getAlbums()

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

[**AlbumListDto**](AlbumListDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getPlaylists

> PlaylistListDto getPlaylists()

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

[**PlaylistListDto**](PlaylistListDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Ok |  -  |
| **404** | User not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## removeSongFromPlaylist

> removeSongFromPlaylist(songId, playlistId)

Removes song from a specific playlist

### Example

```ts
import {
  Configuration,
  MusicPlayControllerApi,
} from '';
import type { RemoveSongFromPlaylistRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MusicPlayControllerApi();

  const body = {
    // number
    songId: 56,
    // number
    playlistId: 56,
  } satisfies RemoveSongFromPlaylistRequest;

  try {
    const data = await api.removeSongFromPlaylist(body);
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
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Ok |  -  |
| **404** | Song or Playlist not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

