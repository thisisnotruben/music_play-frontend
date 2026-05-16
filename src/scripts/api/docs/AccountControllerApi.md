# AccountControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createAccount**](AccountControllerApi.md#createaccount) | **POST** /api/v1/account/create | Create an account |
| [**editAccount**](AccountControllerApi.md#editaccount) | **POST** /api/v1/account/edit | Edits an existing account |
| [**login**](AccountControllerApi.md#login) | **POST** /api/v1/account/login | Login to an account |



## createAccount

> createAccount(accountCreateDto)

Create an account

### Example

```ts
import {
  Configuration,
  AccountControllerApi,
} from '';
import type { CreateAccountRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountControllerApi();

  const body = {
    // AccountCreateDto
    accountCreateDto: ...,
  } satisfies CreateAccountRequest;

  try {
    const data = await api.createAccount(body);
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
| **accountCreateDto** | [AccountCreateDto](AccountCreateDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Ok |  -  |
| **400** | Account already exists |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## editAccount

> editAccount(accountEditDto)

Edits an existing account

### Example

```ts
import {
  Configuration,
  AccountControllerApi,
} from '';
import type { EditAccountRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountControllerApi();

  const body = {
    // AccountEditDto
    accountEditDto: ...,
  } satisfies EditAccountRequest;

  try {
    const data = await api.editAccount(body);
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
| **accountEditDto** | [AccountEditDto](AccountEditDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Ok |  -  |
| **404** | User not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## login

> login(username, password)

Login to an account

### Example

```ts
import {
  Configuration,
  AccountControllerApi,
} from '';
import type { LoginRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountControllerApi();

  const body = {
    // string
    username: username_example,
    // string
    password: password_example,
  } satisfies LoginRequest;

  try {
    const data = await api.login(body);
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
| **username** | `string` |  | [Defaults to `undefined`] |
| **password** | `string` |  | [Defaults to `undefined`] |

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
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

